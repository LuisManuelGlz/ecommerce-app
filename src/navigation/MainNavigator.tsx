import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabsNavigator from './TabsNavigator';
import ShoppingCartScreen from '../screens/ShoppingCart';
import ProductDetailsScreen from '../screens/ProductDetails';
import SearchingScreen from '../screens/Searching';
import SearchResultScreen from '../screens/SearchResult';
import ChangeEmailScreen from '../screens/ChangeEmail';
import ChangePasswordScreen from '../screens/ChangePassword';
import { Colors, Font } from '../styles';
import { IProduct } from '../interfaces/IProduct';
import ProductsProvider from '../context/ProductsContext';
import { ShoppingCart } from '../components';
import PaymentScreen from '../screens/Payment';
import PaymentMethodsScreen from '../screens/PaymentMethods';
import ShippingAddressScreen from '../screens/ShippingAddress';
import SaveShippingAddressScreen from '../screens/SaveShippingAddress/SaveShippingAddressScreen';

export type MainStackParamList = {
  Home: undefined;
  ShoppingCart: undefined;
  ProductDetails: {
    product: IProduct;
  };
  Payment: undefined;
  PaymentMethods: undefined;
  ShippingAddress: undefined;
  SaveShippingAddress: undefined;
  Searching: undefined;
  SearchResult: { search: string };
  ChangeEmail: undefined;
  ChangePassword: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <ProductsProvider>
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
            headerRight: () => <ShoppingCart />,
          }}
        />
        <MainStack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ title: 'Pago' }}
        />
        <MainStack.Screen
          name="PaymentMethods"
          component={PaymentMethodsScreen}
          options={{ title: 'Métodos de pago' }}
        />
        <MainStack.Screen
          name="ShippingAddress"
          component={ShippingAddressScreen}
          options={{ title: 'Direcciones de envío' }}
        />
        <MainStack.Screen
          name="SaveShippingAddress"
          component={SaveShippingAddressScreen}
          options={{ title: 'Direcciones de envío' }}
        />
        <MainStack.Screen
          name="Searching"
          component={SearchingScreen}
          options={{
            title: '',
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        />
        <MainStack.Screen
          name="SearchResult"
          component={SearchResultScreen}
          options={{ title: '' }}
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
    </ProductsProvider>
  );
};

export default MainNavigator;
