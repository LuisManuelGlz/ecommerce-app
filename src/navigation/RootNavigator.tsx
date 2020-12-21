import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigator from './TabsNavigator';
import AuthNavigator from './AuthNavigator';

const RootStack = createStackNavigator();

interface Props {
  isAuthenticated: string;
}

const RootNavigator = ({ isAuthenticated }: Props) => {
  return false ? (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  ) : (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
