// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import MapxusSdk, {
  Appearance,
  GeoPoint,
  TappedOnBlankObject,
  TappedOnPoiObject,
  MapxusPointAnnotationViewProps,
  RouteSearchResult,
  IndoorSceneChangeObject,
  NavigationNewPathObject,
  AdsorptionLocationObject,
  AndroidLocation,
  AdsorptionAndroidLocationObject,
} from '@mapxus/react-native-mapxus-sdk';
import {
  Switch,
  SegmentedControl,
  WhiteSpace,
  Button,
} from '@ant-design/react-native';
import ParamsScrollView from '../ParamsScrollView';
import {map as _map, assign as _assign, find as _find} from 'lodash';
import language from '../utils/language';
import poiType from '../utils/poiTypeData';
import {Provider, Modal} from '@ant-design/react-native';
import getStatusBarHeight from '../utils/getStatusBarHeight';

if (Platform.OS === 'android') {
  MapxusSdk.registerWithApiKey('com.vicosys.trial.android', 'G=TjcJNBzf');
} else {
  console.log('111');
  MapxusSdk.registerWithApiKey('com.vicosys.trial.ios', 'fO0a=E/Pm@');
}

const lang: string =
  (language === 'zh-Hans' && 'cn') ||
  (language === 'zh-Hant' && 'zh') ||
  language;

export default function MapTestScreen() {
  const [startEndClicked, setStartEndClicked] = useState('');
  const [isToDoor, setIsToDoor] = useState(false);
  const [start, setStart] = useState<GeoPoint | null>(null);
  const [end, setEnd] = useState<GeoPoint | null>(null);
  const [fromBuilding, setFromBuilding] = useState('');
  const [fromFloor, setFromFloor] = useState('');
  const [toBuilding, setToBuilding] = useState('');
  const [toFloor, setToFloor] = useState('');
  const [vehicle, setVehicle] = useState('foot');
  const [markers, setMarkers] = useState<Array<MapxusPointAnnotationViewProps>>(
    [],
  );
  const [currentBuilding, setCurrentBuilding] = useState('');
  const [currentFloor, setCurrentFloor] = useState('');
  const [isNavigation, setIsNavigation] = useState(false);
  const [centerCoordinate, setCenterCoordinate] = useState([0, 0]);
  const [appearance, setAppearance] = useState<Appearance>({});
  const [heading, setHeading] = useState(0);
  const [firstIn, setFirstIn] = useState(true);
  const routeRef = useRef<MapxusSdk.RouteView>(null);
  const naviRef = useRef<MapxusSdk.NavigationView>(null);
  const mapRef = useRef<MapxusSdk.MapxusMap>(null);
  const [categories, setCategories] = useState<Array<Category | any>>([]);
  const [categoryType, setCategoryType] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [controllerStatus, setControllerStatus] = useState(0);
  const [pois, setPois] = useState<Array<Poi | any>>([]);
  const [buildingName, setBuildingName] = useState('');
  const [marker, setMarker] = useState<any>(null);
  const [buildingId, setBuildingId] = useState('apm_hk_928eb1');
  const cameraRef = useRef<MapxusSdk.Camera>(null);

  const [floor, setFloor] = useState('N/A');
  const [lat, setLat] = useState(22.312011);
  const [lon, setLon] = useState(114.22489);
  const [accuracy, setAccuracy] = useState(0);
  const [followModel, setFollowModel] = useState<
    'normal' | 'compass' | 'course' | undefined,
  >(undefined);
  const [isFollow, setIsFollow] = useState(false);
  const [buttonTitle, setButtonTitle] = useState<'None' | 'Follow' | 'Heading'>(
    'None',
  );
  const [followModelNumber, setFollowModelNumber] = useState(0);
  const [statusBarHeight, setStatusBarHeight] = useState(
    StatusBar.currentHeight || 0,
  );
  useEffect(() => {
    if (controllerStatus === 1 && marker) {
      setMarker(null);
    }
  }, [controllerStatus]);

  useEffect(
    function updateStartMarker() {
      if (start) {
        setMarkers(
          updateMarker(markers, start, 'start', fromBuilding, fromFloor),
        );
      }
    },
    [start],
  );

  useEffect(
    function updateEndMarker() {
      if (end) {
        setMarkers(updateMarker(markers, end, 'end', toBuilding, toFloor));
      }
    },
    [end],
  );

  async function handleSearch() {
    //xx
    if (start && end) {
      const result: RouteSearchResult =
        await MapxusSdk.routeSearchManager.routeSearch({
          fromBuilding,
          fromFloor,
          fromLon: start.longitude,
          fromLat: start.latitude,
          toBuilding,
          toFloor,
          toLon: end.longitude,
          toLat: end.latitude,
          locale: language,
          vehicle,
          toDoor: isToDoor,
        });
      renderPath(result);
      setMarkers([]);
    }
  }

  function selectPoint(feature: TappedOnBlankObject | TappedOnPoiObject) {
    console.log('feature?.building?.identifier', feature?.building?.identifier);
    if (startEndClicked === 'start') {
      setFromBuilding(feature?.building?.identifier);
      setFromFloor(feature?.floor);
      setStart(feature?.coordinates);
    }
    if (startEndClicked === 'end') {
      setToBuilding(feature?.building?.identifier);
      setToFloor(feature?.floor);
      setEnd(feature?.coordinates);
    }
  }

  function updateMarker(
    markers: Array<MapxusPointAnnotationViewProps>,
    point: GeoPoint,
    type: string,
    buildingId?: string,
    floor?: string,
  ): Array<MapxusPointAnnotationViewProps> {
    let arr: Array<MapxusPointAnnotationViewProps> = [...markers];

    if (
      !markers.length ||
      (markers.length && !_find(markers, m => m.id === type))
    ) {
      arr = arr.concat({
        id: type,
        coordinate: [point?.longitude, point?.latitude],
        buildingId,
        floor,
      });
    } else {
      arr = _map(markers, m => {
        return m.id === type
          ? _assign(m, {coordinate: [point?.longitude, point?.latitude]})
          : m;
      });
    }

    return arr;
  }

  function handleClose() {
    setControllerStatus(controllerStatus - 1);
  }

  async function renderPath(result: RouteSearchResult) {
    setAppearance({isAddStartDash: true});
    routeRef.current?.cleanRoute();

    routeRef.current?.paintRouteUsingPath(
      result?.paths[0],
      result?.wayPointList,
    );

    naviRef.current?.updatePath(result?.paths[0], result?.wayPointList);

    var dto = await routeRef.current?.getPainterPathDto();
    console.log('dto', dto);
    for (const key in dto?.paragraphs) {
      if (dto?.paragraphs.hasOwnProperty(key) && !key.includes('outdoor')) {
        var paragraph = dto.paragraphs[key];
        mapRef.current?.selectIndoorScene(
          MapxusSdk.MapxusZoomMode.DISABLE,
          {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          },
          paragraph.buildingId,
          paragraph.floor,
        );
        routeRef.current?.changeOn(currentBuilding, currentFloor);
        routeRef.current?.focusOn([key], {
          top: 130,
          left: 30,
          bottom: 110,
          right: 80,
        });
        break;
      }
    }
  }

  function handelIndoorSceneChange(feature: IndoorSceneChangeObject) {
    console.log('feature?.building?.identifier'.feature?.building?.identifier);
    setCurrentBuilding(feature.building.identifier);
    setCurrentFloor(feature.floor);
    routeRef.current?.changeOn(feature.building.identifier, feature.floor);
    setBuildingId(feature?.building?.identifier);
    const building: GeoBuilding | any = feature?.building;
    setBuildingName(building ? building[`name_${lang}`] || building.name : '');
  }

  function handleGo() {
    setIsNavigation(!isNavigation);
    if (isNavigation) {
      naviRef.current?.stop();
    } else {
      naviRef.current?.start();
      setAppearance({isAddStartDash: false});
    }
  }

  function onRedrawPath(feature: NavigationNewPathObject) {
    routeRef.current?.cleanRoute();
    routeRef.current?.paintRouteUsingPath(
      feature.newPath,
      feature.originalWayPoints,
    );
    routeRef.current?.changeOn(currentBuilding, currentFloor);
  }

  function onArrivalDestination() {
    setIsNavigation(false);
    naviRef.current?.stop();
    routeRef.current?.cleanRoute();
  }

  function onRefreshAdsorptionLocation(feature: any) {
    if ('buildingId' in feature) {
      const location: AdsorptionLocationObject = feature;
      if (location.adsorptionLocation.coords.heading != undefined) {
        setHeading(location.adsorptionLocation.coords.heading);
      }
      mapRef.current?.selectIndoorScene(
        MapxusSdk.MapxusZoomMode.DISABLE,
        {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
        location.buildingId,
        location.floor,
      );
      setCenterCoordinate([
        location.adsorptionLocation.coords.longitude,
        location.adsorptionLocation.coords.latitude,
      ]);
    } else {
      const location: AdsorptionAndroidLocationObject = feature;
      mapRef.current?.selectIndoorScene(
        MapxusSdk.MapxusZoomMode.DISABLE,
        {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
        location.adsorptionLocation.buildingId,
        location.adsorptionLocation.floor,
      );
      setCenterCoordinate([
        location.adsorptionLocation.longitude,
        location.adsorptionLocation.latitude,
      ]);
    }
  }

  function onUpdate(feature: any) {
    if (!isNavigation && firstIn) {
      setFirstIn(false);
      if ('coords' in feature) {
        const location: MapxusSdk.Location = feature;
        setCenterCoordinate([
          location.coords.longitude,
          location.coords.latitude,
        ]);
      } else {
        const location: AndroidLocation = feature;
        setCenterCoordinate([location.longitude, location.latitude]);
      }
    }
  }

  async function handleExplore() {
    setControllerStatus(controllerStatus + 1);
    const categories: Array<Category> = await getPOICategory({buildingId});
    console.log('categories', categories);

    setCategories(categories);
  }

  function renderCategoriesList(
    data: Array<Category | any>,
    listItemOnClick: (category: string, categoryName: string) => void,
  ) {
    return _map(data, (d, index) => {
      console.log('ddd', d);
      return (
        <TouchableOpacity
          key={index}
          onPress={() => listItemOnClick(d.category, d[`title_${lang}`])}>
          <View style={styles.list_item}>
            {poiType[d.category || 'unspecified'] || poiType['unspecified']}
            <Text style={styles.category_name}>{d[`title_${lang}`]}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  function renderPOIsByCategory(
    data: Array<Poi | any>,
    categoryType: string,
    categoryName: string,
    poiOnClick: (poi: Poi) => void,
  ) {
    return _map(data, (d, index) => {
      console.log('1234', d);
      return (
        <TouchableOpacity key={index} onPress={() => poiOnClick(d)}>
          <View style={styles.list_item}>
            {poiType[categoryType || 'unspecified'] || poiType['unspecified']}
            <View>
              <Text style={styles.category_name}>
                {d[`name_${lang}`] || d.name_default}
              </Text>
              <Text
                style={styles.sub_name}>{`${categoryName} . ${d.floor}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  async function getPOICategory(params: POICategorySearchProps) {
    const data = await MapxusSdk.poiCategorySearchManager.poiCategorySearch(
      params,
    );
    return data?.category || [];
  }

  async function searchPOIs(category: string, name: string) {
    setCategoryType(category);
    setCategoryName(name);

    const total: number = await getPOIsTotal(buildingId, category);
    const pois = await searchPOIsByCategory(buildingId, category, total);
    setPois(pois);
    setControllerStatus(controllerStatus + 1);
  }

  async function getPOIsTotal(buildingId: string, category: string) {
    const data = await MapxusSdk.poiSearchManager.poiSearchInIndoorScene({
      buildingId,
      category,
      offset: 1,
      page: 1,
    });
    return data.total || 0;
  }

  async function searchPOIsByCategory(
    buildingId: string,
    category: string,
    offset: number,
  ) {
    const data = await MapxusSdk.poiSearchManager.poiSearchInIndoorScene({
      buildingId,
      category,
      offset,
      page: 1,
    });
    return data?.pois || [];
  }

  const clickPOI = async (poi: Poi | any) => {
    const buildingId = poi.buildingId;
    const floor = poi.floor;
    const coordinate = [poi.location.longitude, poi.location.latitude];

    setMarker({
      buildingId,
      floor,
      name: poi[`name_${lang}`] || poi.name_default,
      coordinate,
    });

    mapRef.current?.selectIndoorScene(
      MapxusSdk.MapxusZoomMode.DISABLE,
      {top: 0, left: 0, bottom: 0, right: 0},
      buildingId,
      floor,
    );

    cameraRef.current?.moveTo(coordinate);
    cameraRef.current?.zoomTo(19);
    //xxx
    if (lat && lon) {
      const result: RouteSearchResult =
        await MapxusSdk.routeSearchManager.routeSearch({
          fromBuilding,
          fromFloor,
          fromLon: lon,
          fromLat: lat,
          toBuilding,
          toFloor,
          toLon: poi.location.longitude,
          toLat: poi.location.latitude,
          locale: language,
          vehicle,
          toDoor: isToDoor,
        });
      renderPath(result);
      setMarkers([]);
    }
  };

  function handleClick(feature: TappedOnPoiObject) {
    console.log('onclick');
    showModal(
      'poi',
      'You have tapped on',
      feature?.poi?.name,
      feature?.floor,
      feature?.building?.name,
    );
  }
  function showModal(
    object: string,
    title: string,
    coordinateOrPOIName: string,
    floor: string,
    buildingName: string,
  ) {
    const content =
      object === 'building'
        ? `coordinate ${coordinateOrPOIName} \n${floor}, ${buildingName}`
        : `POI: ${coordinateOrPOIName}, \n${floor}, ${buildingName}`;
    console.log('contnt', content);
    Modal.alert(title, content, [{text: 'OK'}]);
  }

  // For iOS
  function handleUpdate(location: MapxusSdk.Location) {
    console.log('handleuP');
    setLat(location.coords.latitude);
    setLon(location.coords.longitude);
    setAccuracy(location.coords.accuracy ? location.coords.accuracy : 0);
    setFloor(location.coords.ordinal ? String(location.coords.ordinal) : 'N/A');
  }
  console.log('lat', lat, lon);

  useEffect(() => {
    switch (followModelNumber) {
      case 0: {
        setButtonTitle('None');
        setIsFollow(false);
        break;
      }
      case 1: {
        setButtonTitle('Follow');
        setIsFollow(true);
        setFollowModel('normal');
        break;
      }
      case 2: {
        setButtonTitle('Heading');
        setIsFollow(true);
        setFollowModel('compass');
        break;
      }
      default: {
        break;
      }
    }
  }, [followModelNumber]);

  // For Android
  function handleChange(location: AndroidLocation) {
    setLat(location.latitude);
    setLon(location.longitude);
    setAccuracy(location.accuracy);
    setFloor(location.floor ? location.floor : '0');
  }
  function handleUserTrackingModeChange(
    e: MapboxGLEvent<
      'usertrackingmodechange',
      {
        followUserLocation: boolean,
        followUserMode: 'normal' | 'compass' | 'course' | null,
      },
    >,
  ) {
    var mIsFollow = e.nativeEvent.payload.followUserLocation;
    var mFollowModel = e.nativeEvent.payload.followUserMode;
    if (mIsFollow) {
      if (mFollowModel === 'normal') {
        setButtonTitle('Follow');
      } else {
        setButtonTitle('Heading');
      }
    } else {
      setButtonTitle('None');
    }
  }

  function handleButtonOnPress() {
    setFollowModelNumber((followModelNumber + 1) % 3);
  }

  useEffect(function initStatusBarHeight() {
    async function getBarHeight() {
      const height = await getStatusBarHeight();
      setStatusBarHeight(height);
    }

    getBarHeight();
  }, []);

  return (
    <Provider>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.text}>lat: {lat}</Text>
          <Text style={styles.text}>lon: {lon}</Text>
          <Text style={styles.text}>floor: {floor}</Text>
          <Text style={styles.text}>accuracy: {accuracy}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            backgroundColor: '#fff',
          }}>
          <View>
            <Button
              style={[styles.button, styles.button_white]}
              {...(startEndClicked === 'start' ? {type: 'primary'} : {})}
              onPress={() =>
                setStartEndClicked(startEndClicked === 'start' ? '' : 'start')
              }>
              {startEndClicked === 'start' ? 'Tap screen for Start' : 'Start'}
            </Button>
            <WhiteSpace />
            <Button
              style={[styles.button, styles.button_white]}
              {...(startEndClicked === 'end' ? {type: 'primary'} : {})}
              onPress={() =>
                setStartEndClicked(startEndClicked === 'end' ? '' : 'end')
              }>
              {startEndClicked === 'end' ? 'Tap screen for End' : 'End'}
            </Button>
          </View>
          <View style={styles.button_blue_wrapper}>
            <Button
              type={'primary'}
              style={[styles.button, {marginRight: 15}]}
              onPress={handleSearch}>
              Search
            </Button>
            <Button
              type={'primary'}
              style={[styles.button, {marginRight: 15}]}
              onPress={handleGo}>
              {isNavigation ? 'Stop' : 'Go'}
            </Button>
          </View>
        </View>
        <View style={{flex: controllerStatus ? 2 : 8}}>
          <MapxusSdk.MapxusMap
            ref={mapRef}
            mapOption={{
              buildingId: 'apm_hk_928eb1',
              floor: 'L3',
              zoomInsets: {top: 0, left: 0, bottom: 0, right: 0},
            }}
            onTappedOnBlank={selectPoint}
            onTappedOnPoi={selectPoint}
            onIndoorSceneChange={handelIndoorSceneChange}
            onTappedOnPoi={handleClick}>
            <MapxusSdk.MapView style={{flex: 1}}>
              {Platform.OS === 'ios' ? (
                <View>
                  <MapxusSdk.Camera
                    centerCoordinate={centerCoordinate}
                    zoomLevel={19}
                    heading={heading}
                    ref={cameraRef}
                    followUserMode={followModel}
                    followUserLocation={isFollow}
                    onUserTrackingModeChange={handleUserTrackingModeChange}
                  />
                  <MapxusSdk.UserLocation
                    renderMode={'native'}
                    visible={true}
                    showsUserHeadingIndicator={true}
                    onUpdate={handleUpdate}
                  />
                </View>
              ) : null}
            </MapxusSdk.MapView>
            {markers.map((marker: MapxusPointAnnotationViewProps) => (
              <MapxusSdk.MapxusPointAnnotationView
                key={marker.id}
                id={marker.id}
                coordinate={marker.coordinate}
                buildingId={marker.buildingId}
                floor={marker.floor}>
                <TouchableOpacity style={styles.marker}>
                  <Image
                    source={require('../assets/startPoint.png')}
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
              </MapxusSdk.MapxusPointAnnotationView>
            ))}
            <MapxusSdk.RouteView ref={routeRef} routeAppearance={appearance} />
            <MapxusSdk.NavigationView
              distanceToDestination={3}
              ref={naviRef}
              adsorbable={true}
              shortenable={true}
              showsUserHeadingIndicator={true}
              onGetNewPath={onRedrawPath}
              onArrivalAtDestination={onArrivalDestination}
              onRefreshTheAdsorptionLocation={onRefreshAdsorptionLocation}
              onUpdate={onUpdate}
            />
          </MapxusSdk.MapxusMap>
        </View>
        <ParamsScrollView style={{backgroundColor: '#fff'}}>
          {/* <View style={styles.controller}>
          <SegmentedControl
            values={['foot', 'wheelchair']}
            onValueChange={setVehicle}
          />
          <WhiteSpace />
          <View style={styles.inner}>
            <Text style={styles.fontStyle}>toDoor</Text>
            <Switch checked={isToDoor} onChange={setIsToDoor} />
          </View>
        </View> */}
          <Button
            type={'primary'}
            // style={[styles.button, {bottom: 10 + statusBarHeight}]}
            onPress={handleButtonOnPress}>
            {buttonTitle}
          </Button>
          {controllerStatus === 0 ? (
            <Button
              type="primary"
              style={styles.button}
              onPress={handleExplore}>
              Explore
            </Button>
          ) : (
            <View style={{padding: 15, backgroundColor: '#fff'}}>
              <View style={styles.category_header}>
                <TouchableOpacity
                  style={styles.close_icon}
                  onPress={handleClose}>
                  <Image
                    source={require('../assets/close.png')}
                    style={styles.close_icon_img}
                  />
                </TouchableOpacity>
                <Text style={styles.building_name}>
                  {controllerStatus === 1 ? buildingName : categoryName}
                </Text>
              </View>
              <View style={{backgroundColor: '#fff'}}>
                {controllerStatus === 1
                  ? renderCategoriesList(categories, searchPOIs)
                  : renderPOIsByCategory(
                      pois,
                      categoryType,
                      categoryName,
                      clickPOI,
                    )}
              </View>
            </View>
          )}
        </ParamsScrollView>
        {/* <Button
							type='primary'
							style={styles.button}
							onPress={handleExplore}
						>
							Explore Harbour City
						</Button>
      <View>
								{
									controllerStatus === 1
										? renderCategoriesList(categories, searchPOIs)
										: renderPOIsByCategory(pois, categoryType, categoryName, clickPOI)
								}
							</View> */}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // // flexWrap: 'wrap',
    // // justifyContent: 'space-around',
    backgroundColor: 'red',
    // flexDirection:'column'
  },
  button: {
    borderWidth: 0,
    height: 'auto',
    paddingVertical: 8,
    justifyContent: 'center',
  },
  button_white: {
    width: 160,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button_white_active: {
    backgroundColor: '#7393e7',
  },
  button_blue_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controller: {
    backgroundColor: '#fff',
    paddingHorizontal: 60,
    marginTop: 15,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontStyle: {
    fontSize: 18,
    marginRight: 10,
  },
  marker: {
    width: 30,
    height: 85,
  },
  controller: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontStyle: {
    marginLeft: 5,
    fontSize: 17,
  },
  // button: {
  // 	backgroundColor: '#74aded',
  // 	borderWidth: 0,
  // 	borderRadius: 15,
  // 	width: '90%',
  // 	height: 'auto',
  // 	marginTop: 15,
  // 	paddingVertical: 8,
  // 	paddingHorizontal: 10,
  // 	alignSelf: 'center'
  // },
  category_header: {
    position: 'relative',
    marginBottom: 8,
  },
  building_name: {
    color: 'rgba(0, 0, 0, 0.9)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  close_icon: {
    position: 'absolute',
    top: -6,
    right: -2,
    width: 32,
    height: 32,
    zIndex: 1,
  },
  close_icon_img: {
    position: 'absolute',
    right: 0,
    width: '90%',
    height: '90%',
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#d2d2d2',
  },
  category_name: {
    fontSize: 16,
  },
  sub_name: {
    color: 'gray',
    fontSize: 13,
  },
});
