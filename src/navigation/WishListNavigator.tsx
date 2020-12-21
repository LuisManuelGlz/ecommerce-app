import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WishListScreen from '../screens/WishList';

const WishListStack = createStackNavigator();

const WishListNavigator = () => {
  return (
    <WishListStack.Navigator>
      <WishListStack.Screen name="WishList" component={WishListScreen} />
    </WishListStack.Navigator>
  );
};

export default WishListNavigator;
