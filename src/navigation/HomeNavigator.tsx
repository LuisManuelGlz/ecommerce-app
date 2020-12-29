import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home';
import { Colors } from '../styles';
import { useNavigation } from '@react-navigation/native';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  const navigation = useNavigation();

  return (
    <HomeStack.Navigator screenOptions={{ headerTransparent: true, title: '' }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: (props) => (
            <Ionicons
              {...props}
              style={{ marginRight: 20 }}
              name="cart"
              color={Colors.primary}
              size={30}
              onPress={() => navigation.navigate('ShoppingCart')}
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
