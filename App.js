// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * @format
// //  * @flow strict-local
// //  */

// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapTestScreen from './src/screens/MapTest';
import HelloWorldSceneAR from './src/screens/HelloWorldSceneAR';
console.log('MapTestScreen', MapTestScreen);
function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <View>
        <Text>1212</Text>
      </View>
      <Button
        title="map"
        onPress={() => {
          navigation.navigate('Map');
        }}></Button>
      <Button
        title="ar"
        onPress={() => {
          navigation.navigate('ARTest');
        }}></Button>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapTestScreen} />
        <Stack.Screen name="ARTest" component={HelloWorldSceneAR} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
