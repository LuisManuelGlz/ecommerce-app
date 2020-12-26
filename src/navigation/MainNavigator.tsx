import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabsNavigator from './TabsNavigator';
import ChangeEmailScreen from '../screens/ChangeEmail';
import ChangePasswordScreen from '../screens/ChangePassword';
import { Colors, Font } from '../styles';

const MainStack = createStackNavigator();

const MainNavigator = () => {
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
        options={{ headerShown: false }}
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
