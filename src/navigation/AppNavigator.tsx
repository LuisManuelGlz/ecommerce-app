import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigator from './RootNavigator';
import { Colors } from '../styles';

const AppStack = createStackNavigator();

const Dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.primary,
    text: Colors.light,
    background: Colors.dark,
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={Dark}>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Root"
          component={RootNavigator}
          options={{ headerShown: false }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
