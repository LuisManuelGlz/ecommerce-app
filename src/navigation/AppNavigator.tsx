import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigator from './RootNavigator';
import AuthProvider from '../context/AuthContext';
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
    <AuthProvider>
      <NavigationContainer theme={Dark}>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Root" component={RootNavigator} />
        </AppStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
