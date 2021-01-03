import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigator from './RootNavigator';
import AuthProvider from '../context/AuthContext';
import AlertProvider from '../context/AlertContext';
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
    <AlertProvider>
      <AuthProvider>
        <NavigationContainer theme={Dark}>
          <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="Root" component={RootNavigator} />
          </AppStack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </AlertProvider>
  );
};

export default AppNavigator;
