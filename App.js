// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React, {useRef, useState} from 'react';
// import {View, StyleSheet} from 'react-native';
// import MapxusSdk, {Building} from '@mapxus/react-native-mapxus-sdk';
// import {Button, InputItem, List} from '@ant-design/react-native';
// import ParamsScrollView from './src/ParamsScrollView';
// import turfBboxPolygon from '@turf/bbox-polygon';
// import {BBox, Polygon} from '@turf/helpers';
// import {Feature} from 'geojson';
// import language from './src/utils/language';

import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
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
import ParamsScrollView from './src/ParamsScrollView';
import {map as _map, assign as _assign, find as _find} from 'lodash';
import language from './src/utils/language';
import poiType from './src/utils/poiTypeData';
import {Provider, Modal} from '@ant-design/react-native';

// import React, {useState} from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Platform,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import MapxusSdk from '@mapxus/react-native-mapxus-sdk';
// // import config from './utils/config';
// // MapxusSdk.registerWithApiKey(config.get('apiKey'), config.get('secret'));
// import ParamsScrollView from './src/ParamsScrollView';
// import {Switch, Button} from '@ant-design/react-native';

if (Platform.OS === 'android') {
  MapxusSdk.registerWithApiKey('com.vicosys.trial.android', 'G=TjcJNBzf');
} else {
  console.log('111');
  MapxusSdk.registerWithApiKey('com.vicosys.trial.ios', 'fO0a=E/Pm@');
}

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   const [checked, setChecked] = useState(false);
//   const [position, setPosition] = useState(
//     MapxusSdk.MapxusSelectorPosition.CENTER_LEFT,
//   );
//   const [hidden, setHidden] = useState(false);

//   function handleCheck(checked: boolean) {
//     setChecked(checked);
//     setHidden(!hidden);
//   }

//   function handleClick() {
//     setPosition(position > 4 ? 0 : position + 1);
//   }

//   return (
//     <View style={{flex: 1}}>
//       {/* <MapxusSdk.MapxusMap
//         mapOption={{
//           buildingId: 'tsuenwanplaza_hk_369d01',
//           floor: 'L3',
//         }}>
//         <MapxusSdk.MapView style={{flex: 1}} />
//       </MapxusSdk.MapxusMap> */}
//       {/* <MapxusSdk.MapxusMap>
//         <MapxusSdk.MapView style={{flex: 1}}>
//           <MapxusSdk.Camera
//             zoomLevel={18}
//             centerCoordinate={[114.111375, 22.370787]}
//           />
//         </MapxusSdk.MapView>
//       </MapxusSdk.MapxusMap> */}
//       {/* <MapxusSdk.MapxusMap
//         mapOption={{
//           buildingId: 'tsuenwanplaza_hk_369d01',
//           floor: 'L3',
//           zoomInsets: {top: 0, left: 0, bottom: 0, right: 0},
//         }}>
//         <MapxusSdk.MapView style={{flex: 1}} />
//       </MapxusSdk.MapxusMap> */}
//       <View style={{flex: 6}}>
//         <MapxusSdk.MapxusMap
//           indoorControllerAlwaysHidden={hidden}
//           selectorPosition={position}
//           mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
//           <MapxusSdk.MapView style={{flex: 1}} />
//         </MapxusSdk.MapxusMap>
//       </View>
//       <ParamsScrollView>
//         <View style={styles.controller}>
//           <View style={styles.inner}>
//             <Switch checked={checked} onChange={handleCheck} />
//             <Text style={styles.fontStyle}>isAlwaysHidden</Text>
//           </View>
//           <Button type="primary" style={styles.button} onPress={handleClick}>
//             Position
//           </Button>
//         </View>
//       </ParamsScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

//

// import React, {useRef, useState} from 'react';
// import {View, StyleSheet} from 'react-native';
// import MapxusSdk, {
//   MapxusPointAnnotationViewProps,
// } from '@mapxus/react-native-mapxus-sdk';
// import {Button, InputItem, List} from '@ant-design/react-native';
// import ParamsScrollView from './src/ParamsScrollView';

// export default function App() {
//   const [buildingId, setBuildingId] = useState('harbourcity_hk_8b580b');
//   const [floor, setFloor] = useState('L3');
//   const mapRef = useRef<MapxusSdk.MapxusMap>(null);

//   function handleClick() {
//     mapRef.current?.selectIndoorScene(
//       MapxusSdk.MapxusZoomMode.ANIMATED,
//       {top: 0, left: 0, bottom: 0, right: 0},
//       buildingId.trim(),
//       floor.trim(),
//     );
//   }

//   return (
//     <View style={{flex: 1}}>
//       <View style={{flex: 3}}>
//         <MapxusSdk.MapxusMap
//           ref={mapRef}
//           mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
//           <MapxusSdk.MapView style={{flex: 1}} />
//         </MapxusSdk.MapxusMap>
//       </View>
//       <ParamsScrollView>
//         <List style={{marginTop: 10}}>
//           <InputItem
//             labelNumber={5}
//             style={styles.input}
//             value={buildingId}
//             onChange={setBuildingId}>
//             buildingId:
//           </InputItem>
//           <InputItem
//             labelNumber={5}
//             style={styles.input}
//             value={floor}
//             onChange={setFloor}>
//             floor:
//           </InputItem>
//         </List>
//         <Button
//           type={'primary'}
//           style={[styles.button, {marginTop: 15}]}
//           onPress={handleClick}>
//           Switch
//         </Button>
//       </ParamsScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 5,
//   },
//   button: {
//     height: 'auto',
//     marginTop: 5,
//     marginLeft: 15,
//     marginRight: 15,
//     paddingVertical: 8,
//     textAlign: 'center',
//   },
// });

// const pois: Array<MapxusPointAnnotationViewProps> = [
//   {
//     id: '12608',
//     coordinate: [114.1112401, 22.3709189],
//     buildingId: 'tsuenwanplaza_hk_369d01',
//     floor: 'L1',
//     title: '百老匯戲院售票處',
//   },
//   {
//     id: '12620',
//     coordinate: [114.1115583, 22.370798],
//     buildingId: 'tsuenwanplaza_hk_369d01',
//     floor: 'L1',
//     title: '周生生',
//   },
//   {
//     id: '16856',
//     coordinate: [114.1113111, 22.3709482],
//     buildingId: 'tsuenwanplaza_hk_369d01',
//     floor: 'L2',
//     title: 'bread n butter',
//   },
//   {
//     id: '24135',
//     coordinate: [114.1109644, 22.3710719],
//     buildingId: 'tsuenwanplaza_hk_369d01',
//     floor: 'L4',
//     title: '一田百貨',
//   },
// ];

// export default function IndoorMarker() {
//   return (
//     <View style={{flex: 1}}>
//       <MapxusSdk.MapxusMap
//         mapOption={{
//           buildingId: 'tsuenwanplaza_hk_369d01',
//           zoomInsets: {left: -100, right: -100},
//         }}>
//         <MapxusSdk.MapView style={{flex: 1}} />
//         {pois.map((poi: MapxusPointAnnotationViewProps) => (
//           <MapxusSdk.MapxusPointAnnotationView
//             key={poi.id}
//             id={poi.id}
//             coordinate={poi.coordinate}
//             buildingId={poi.buildingId}
//             floor={poi.floor}
//             title={poi.title}>
//             <MapxusSdk.Callout title={poi.title} />
//           </MapxusSdk.MapxusPointAnnotationView>
//         ))}
//       </MapxusSdk.MapxusMap>
//     </View>
//   );
// }

// import React, {useEffect, useState} from 'react';
// import {View, Text, StatusBar, Platform, StyleSheet} from 'react-native';
// import {Button} from '@ant-design/react-native';
// import MapxusSdk, {
//   AndroidLocation,
//   MapboxGLEvent,
// } from '@mapxus/react-native-mapxus-sdk';
// import getStatusBarHeight from './src/utils/getStatusBarHeight';
// import ParamsScrollView from './src/ParamsScrollView';

// export default function DisplayLocation() {
//   const [statusBarHeight, setStatusBarHeight] = useState(
//     StatusBar.currentHeight || 0,
//   );
//   const [followModelNumber, setFollowModelNumber] = useState(0);
//   const [isFollow, setIsFollow] = useState(false);
//   const [followModel, setFollowModel] = useState<
//     'normal' | 'compass' | 'course' | undefined,
//   >(undefined);
//   const [buttonTitle, setButtonTitle] = useState<'None' | 'Follow' | 'Heading'>(
//     'None',
//   );

//   const [floor, setFloor] = useState('N/A');
//   const [lat, setLat] = useState(0);
//   const [lon, setLon] = useState(0);
//   const [accuracy, setAccuracy] = useState(0);

//   useEffect(function initStatusBarHeight() {
//     async function getBarHeight() {
//       const height = await getStatusBarHeight();
//       setStatusBarHeight(height);
//     }

//     getBarHeight();
//   }, []);

//   useEffect(() => {
//     switch (followModelNumber) {
//       case 0: {
//         setButtonTitle('None');
//         setIsFollow(false);
//         break;
//       }
//       case 1: {
//         setButtonTitle('Follow');
//         setIsFollow(true);
//         setFollowModel('normal');
//         break;
//       }
//       case 2: {
//         setButtonTitle('Heading');
//         setIsFollow(true);
//         setFollowModel('compass');
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//   }, [followModelNumber]);

//   // For iOS
//   function handleUpdate(location: MapxusSdk.Location) {
//     setLat(location.coords.latitude);
//     setLon(location.coords.longitude);
//     setAccuracy(location.coords.accuracy ? location.coords.accuracy : 0);
//     setFloor(location.coords.ordinal ? String(location.coords.ordinal) : 'N/A');
//   }

//   // For Android
//   function handleChange(location: AndroidLocation) {
//     setLat(location.latitude);
//     setLon(location.longitude);
//     setAccuracy(location.accuracy);
//     setFloor(location.floor ? location.floor : '0');
//   }

//   function handleUserTrackingModeChange(
//     e: MapboxGLEvent<
//       'usertrackingmodechange',
//       {
//         followUserLocation: boolean,
//         followUserMode: 'normal' | 'compass' | 'course' | null,
//       },
//     >,
//   ) {
//     var mIsFollow = e.nativeEvent.payload.followUserLocation;
//     var mFollowModel = e.nativeEvent.payload.followUserMode;
//     if (mIsFollow) {
//       if (mFollowModel === 'normal') {
//         setButtonTitle('Follow');
//       } else {
//         setButtonTitle('Heading');
//       }
//     } else {
//       setButtonTitle('None');
//     }
//   }

//   function handleButtonOnPress() {
//     setFollowModelNumber((followModelNumber + 1) % 3);
//   }

//   return (
//     <View style={{flex: 1}}>
//       <View style={styles.container}>
//         <Text style={styles.text}>lat: {lat}</Text>
//         <Text style={styles.text}>lon: {lon}</Text>
//         <Text style={styles.text}>floor: {floor}</Text>
//         <Text style={styles.text}>accuracy: {accuracy}</Text>
//       </View>
//       <View style={{flex: 1}}>
//         <MapxusSdk.MapxusMap
//           mapOption={{
//             buildingId: 'tsuenwanplaza_hk_369d01',
//             zoomInsets: {left: -100, right: -100},
//           }}>
//           <MapxusSdk.MapView style={{flex: 1}}>
//             {Platform.OS == 'ios' ? (
//               <View>
//                 <MapxusSdk.Camera
//                   followUserMode={followModel}
//                   followUserLocation={isFollow}
//                   onUserTrackingModeChange={handleUserTrackingModeChange}
//                 />
//                 <MapxusSdk.UserLocation
//                   renderMode={'native'}
//                   visible={true}
//                   showsUserHeadingIndicator={true}
//                   onUpdate={handleUpdate}
//                 />
//               </View>
//             ) : null}
//           </MapxusSdk.MapView>
//           {Platform.OS == 'android' ? (
//             <MapxusSdk.MapxusMapLocation
//               followUserMode={
//                 followModelNumber === 0 ? 0 : followModelNumber === 1 ? 1 : 3
//               }
//               onLocationStarted={() => {
//                 // console.log("start")
//               }}
//               onLocationStopped={() => {
//                 // console.log("stop")
//               }}
//               onLocationError={data => {
//                 // console.log(data)
//               }}
//               onCompassChange={data => {
//                 // console.log(data)
//               }}
//               onLocationChange={handleChange}
//             />
//           ) : null}
//         </MapxusSdk.UserLocation>
//       </View>
//       <Button
//         type={'primary'}
//         style={[styles.button, {bottom: 10 + statusBarHeight}]}
//         onPress={handleButtonOnPress}>
//         {buttonTitle}
//       </Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   text: {
//     width: '48%',
//     fontSize: 18,
//   },
//   button: {
//     position: 'absolute',
//     right: 10,
//     height: 'auto',
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//   },
// });

// import React, {useRef, useState} from 'react';
// import {View, StyleSheet} from 'react-native';
// import MapxusSdk, {Building} from '@mapxus/react-native-mapxus-sdk';
// import {Button, InputItem, List} from '@ant-design/react-native';
// import ParamsScrollView from './src/ParamsScrollView';
// import turfBboxPolygon from '@turf/bbox-polygon';
// import {BBox, Polygon} from '@turf/helpers';
// import {Feature} from 'geojson';
// import language from './src/utils/language';

// export default function SearchBuildingInBound() {
//   const [words, setWords] = useState('');
//   const [southWest, setSouthWest] = useState('114.158608, 22.292540');
//   const [northEast, setNorthEast] = useState('114.172422, 22.310600');
//   const [offset, setOffset] = useState('10');
//   const [page, setPage] = useState('1');
//   const [markers, setMarkers] = useState<Array<any>>([]);
//   const [boundPolygon, setBoundPolygon] = useState<GeoJSON.Feature | null>(
//     null,
//   );
//   const cameraRef = useRef<MapxusSdk.Camera>(null);

//   async function handleClick() {
//     const sw: Array<string> = southWest.split(
//       southWest.includes(',') ? ',' : '，',
//     );
//     const ne: Array<string> = northEast.split(
//       northEast.includes(',') ? ',' : '，',
//     );

//     if (sw.length === 2 && ne.length === 2) {
//       const num_sw: Array<number> = sw.map(s => Number(s.trim()));
//       const num_ne: Array<number> = ne.map(s => Number(s.trim()));

//       const data = await MapxusSdk.buildingSearchManager.buildingSearchOnBbox({
//         bbox: {
//           min_longitude: num_sw[0],
//           min_latitude: num_sw[1],
//           max_longitude: num_ne[0],
//           max_latitude: num_ne[1],
//         },
//         keywords: words.trim(),
//         offset: Number(offset.trim()),
//         page: Number(page.trim()),
//       });
//       const buildings: Building[] = data?.buildings;

//       if (buildings?.length) {
//         setMarkers([]);
//         const lang: string =
//           (language === 'zh-Hans' && 'cn') ||
//           (language === 'zh-Hant' && 'zh') ||
//           language;
//         const _markers: Array<any> = buildings.map((b: Building | any) => ({
//           coordinate: [
//             Number(b?.labelCenter?.longitude),
//             Number(b?.labelCenter?.latitude),
//           ],
//           name: b[`name_${lang}`] || b.name_default,
//         }));

//         setMarkers(_markers);

//         const bbox: BBox = [num_sw[0], num_sw[1], num_ne[0], num_ne[1]];
//         const bboxPolygon: Feature<Polygon> = turfBboxPolygon(bbox);
//         setBoundPolygon(bboxPolygon);

//         cameraRef.current?.fitBounds(num_ne, num_sw, 50);
//       }
//     } else {
//       console.log('输入格式有误');
//     }
//   }

//   return (
//     <View style={{flex: 1}}>
//       <View style={{flex: 2}}>
//         <MapxusSdk.MapxusMap
//           mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
//           <MapxusSdk.MapView style={{flex: 1}}>
//             <MapxusSdk.Camera ref={cameraRef} />
//             {boundPolygon ? (
//               <MapxusSdk.ShapeSource
//                 id={'customSourceSample'}
//                 shape={boundPolygon}>
//                 <MapxusSdk.FillLayer
//                   id={'customLayerSample'}
//                   style={{fillOpacity: 0.3}}
//                 />
//               </MapxusSdk.ShapeSource>
//             ) : null}
//             {markers.length
//               ? markers.map((marker, idx) => (
//                   <MapxusSdk.PointAnnotation
//                     key={idx}
//                     id={`${idx}`}
//                     coordinate={marker.coordinate}
//                     title={marker.name}>
//                     <MapxusSdk.Callout title={marker.name} />
//                   </MapxusSdk.PointAnnotation>
//                 ))
//               : null}
//           </MapxusSdk.MapView>
//         </MapxusSdk.MapxusMap>
//       </View>
//       <ParamsScrollView>
//         <List style={{marginTop: 10}}>
//           <InputItem
//             labelNumber={5}
//             style={styles.input}
//             value={words}
//             onChange={setWords}>
//             keywords:
//           </InputItem>
//           <InputItem
//             labelNumber={5}
//             style={styles.input}
//             value={southWest}
//             onChange={setSouthWest}>
//             southWest:
//           </InputItem>
//           <InputItem
//             labelNumber={5}
//             style={styles.input}
//             value={northEast}
//             onChange={setNorthEast}>
//             northEast:
//           </InputItem>
//           <InputItem
//             labelNumber={5}
//             style={styles.input}
//             value={offset}
//             onChange={setOffset}>
//             offset:
//           </InputItem>
//           <InputItem
//             labelNumber={5}
//             style={styles.input}
//             value={page}
//             onChange={setPage}>
//             page:
//           </InputItem>
//         </List>
//         <Button type={'primary'} style={styles.button} onPress={handleClick}>
//           Search
//         </Button>
//       </ParamsScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 5,
//   },
//   button: {
//     height: 'auto',
//     paddingVertical: 8,
//     marginTop: 15,
//     marginBottom: 10,
//     marginHorizontal: 15,
//   },
// });
const lang: string = (language === 'zh-Hans' && 'cn') || (language === 'zh-Hant' && 'zh') || language;

export default function Route() {
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
  const [buildingId, setBuildingId] = useState('tsuenwanplaza_hk_369d01');
  const cameraRef = useRef<MapxusSdk.Camera>(null);
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
    console.log(
      'result?.paths[0], result?.wayPointList',
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
		setCategories(categories);
	}

  function renderCategoriesList(
    data: Array<Category | any>,
    listItemOnClick: (category: string, categoryName: string) => void
  ) {
    return (
      _map(data, (d, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => listItemOnClick(d.category, d[`title_${lang}`])}
          >
            <View style={styles.list_item}>
              {poiType[d.category || 'unspecified'] || poiType['unspecified']}
              <Text style={styles.category_name}>{d[`title_${lang}`]}</Text>
            </View>
          </TouchableOpacity>
        )
      })
    );
  }
  
  function renderPOIsByCategory(
    data: Array<Poi | any>,
    categoryType: string,
    categoryName: string,
    poiOnClick: (poi: Poi) => void
  ) {
    return (
      _map(data, (d, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => poiOnClick(d)}
          >
            <View style={styles.list_item}>
              {poiType[categoryType || 'unspecified'] || poiType['unspecified']}
              <View>
                <Text style={styles.category_name}>{d[`name_${lang}`] || d.name_default}</Text>
                <Text
                  style={styles.sub_name}>{`${categoryName} . ${d.floor}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })
    );
  }

  async function getPOICategory(params: POICategorySearchProps) {
    const data = await MapxusSdk.poiCategorySearchManager.poiCategorySearch(params);
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
    const data = await MapxusSdk.poiSearchManager.poiSearchInIndoorScene(
      {buildingId, category, offset: 1, page: 1}
    );
    return data.total || 0;
  }

  async function searchPOIsByCategory(buildingId: string, category: string, offset: number) {
    const data = await MapxusSdk.poiSearchManager.poiSearchInIndoorScene(
      {buildingId, category, offset, page: 1}
    );
    return data?.pois || [];
  }
  

	function clickPOI(poi: Poi | any) {
		const buildingId = poi.buildingId;
		const floor = poi.floor;
		const coordinate = [poi.location.longitude, poi.location.latitude];

		setMarker({
			buildingId,
			floor,
			name: poi[`name_${lang}`] || poi.name_default,
			coordinate
		});

		mapRef.current?.selectIndoorScene(
			MapxusSdk.MapxusZoomMode.DISABLE,
			{top: 0, left: 0, bottom: 0, right: 0},
			buildingId,
			floor
		);

		cameraRef.current?.moveTo(coordinate);
		cameraRef.current?.zoomTo(19);
	}

 
  function handleClick(feature: TappedOnPoiObject) {
    console.log('onclick')
    showModal(
        'poi',
        'You have tapped on',
        feature?.poi?.name,
        feature?.floor,
        feature?.building?.name
    )
}
function showModal(object: string, title: string, coordinateOrPOIName: string, floor: string, buildingName: string) {
  const content = object === 'building'
      ? `coordinate ${coordinateOrPOIName} \n${floor}, ${buildingName}`
      : `POI: ${coordinateOrPOIName}, \n${floor}, ${buildingName}`;
  console.log('contnt', content)
  Modal.alert(
      title,
      content,
      [{text: 'OK'}]
  );
}
  return (
    <Provider>
    <View style={{flex: 1, marginTop: 100}}>
      <View style={styles.container}>
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
            buildingId: 'tsuenwanplaza_hk_369d01',
            floor: 'L3',
            zoomInsets: {top: 0, left: 0, bottom: 0, right: 0},
          }}
          onTappedOnBlank={selectPoint}
          onTappedOnPoi={selectPoint}
          onIndoorSceneChange={handelIndoorSceneChange} onTappedOnPoi={handleClick}>
            
          <MapxusSdk.MapView style={{flex: 1}}>
            <MapxusSdk.Camera
              centerCoordinate={centerCoordinate}
              zoomLevel={19}
              heading={heading}
              ref={cameraRef}
            />
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
                  source={require('./src/assets/startPoint.png')}
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
      <ParamsScrollView>
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
        {
					controllerStatus === 0
						? <Button
							type='primary'
							style={styles.button}
							onPress={handleExplore}
						>
							Explore Harbour City
						</Button>
						: <View style={{margin: 15}}>
							<View style={styles.category_header}>
								<TouchableOpacity
									style={styles.close_icon}
									onPress={handleClose}
								>
									<Image
										source={require('./src/assets/close.png')}
										style={styles.close_icon_img}
									/>
								</TouchableOpacity>
								<Text style={styles.building_name}>
									{
										controllerStatus === 1
											? buildingName
											: categoryName
									}
								</Text>
							</View>
							<View>
								{
									controllerStatus === 1
										? renderCategoriesList(categories, searchPOIs)
										: renderPOIsByCategory(pois, categoryType, categoryName, clickPOI)
								}
							</View>
						</View>
				}
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
    </View>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
		justifyContent: 'space-around'
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	fontStyle: {
		marginLeft: 5,
		fontSize: 17
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
		marginBottom: 8
	},
	building_name: {
		color: 'rgba(0, 0, 0, 0.9)',
		fontSize: 18,
		fontWeight: 'bold'
	},
	close_icon: {
		position: 'absolute',
		top: -6,
		right: -2,
		width: 32,
		height: 32,
		zIndex: 1
	},
	close_icon_img: {
		position: 'absolute',
		right: 0,
		width: '90%',
		height: '90%'
	},
	list_item: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderColor: '#d2d2d2'
	},
	category_name: {
		fontSize: 16
	},
	sub_name: {
		color: 'gray',
		fontSize: 13
	}
});
