/*
설치 모듈
@react-navigation/native
@react-navigation/stack
react-native-gesture-handler
react-native-screens
@react-native-community/masked-view
redux
react-redux
*/

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Home';
import setLocationScreen from './SetLocationInfo';

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Linfo" component={setLocationScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
