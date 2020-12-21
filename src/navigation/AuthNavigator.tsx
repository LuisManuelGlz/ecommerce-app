import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from '../screens/Intro';
import SignInScreen from '../screens/SignIn';
import SignUpStepOneScreen from '../screens/SignUpStepOne';
import SignUpStepTwoScreen from '../screens/SignUpStepTwo';
import LinearGradient from 'react-native-linear-gradient';

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerTransparent: true }}>
    <AuthStack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="SignUpStepOne" component={SignUpStepOneScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="SignUpStepTwo" component={SignUpStepTwoScreen} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
