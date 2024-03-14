import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/screens/navigator/MainStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <Text>App</Text>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
