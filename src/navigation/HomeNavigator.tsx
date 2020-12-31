import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import { ShoppingCart } from '../components';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerTransparent: true, title: '' }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <ShoppingCart />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
