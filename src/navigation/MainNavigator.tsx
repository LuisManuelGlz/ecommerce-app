import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabsNavigator from './TabsNavigator';
import ShoppingCartScreen from '../screens/ShoppingCart';
import ProductDetailsScreen from '../screens/ProductDetails';
import ChangeEmailScreen from '../screens/ChangeEmail';
import ChangePasswordScreen from '../screens/ChangePassword';
import { Colors, Font } from '../styles';
import { useNavigation } from '@react-navigation/native';

const MainStack = createStackNavigator();

const MainNavigator = () => {
  const navigation = useNavigation();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerLeft: (props) => (
          <Ionicons
            {...props}
            style={{ marginLeft: 20 }}
            name="chevron-back"
            color={Colors.primary}
            size={30}
          />
        ),
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: Font.FontSize.H2 },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <MainStack.Screen
        name="Home"
        component={TabsNavigator}
        options={{ title: '', headerLeft: undefined }}
      />
      <MainStack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{ title: 'Carrito de compras' }}
      />
      <MainStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: '',
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
      <MainStack.Screen
        name="ChangeEmail"
        component={ChangeEmailScreen}
        options={{ title: 'Correo electrónico' }}
      />
      <MainStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: 'Contraseña' }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
