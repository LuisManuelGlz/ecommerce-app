import React, { Fragment, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from '../screens/Intro';
import SignInScreen from '../screens/SignIn';
import SignUpStepOneScreen from '../screens/SignUpStepOne';
import SignUpStepTwoScreen from '../screens/SignUpStepTwo';
import { AuthContext } from '../context';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <AuthStack.Navigator screenOptions={{ headerTransparent: true }}>
      {user ? (
        <AuthStack.Screen
          name="SignUpStepTwo"
          component={SignUpStepTwoScreen}
          options={{ title: '' }}
        />
      ) : (
        <Fragment>
          <AuthStack.Screen
            name="Intro"
            component={IntroScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="SignUpStepOne"
            component={SignUpStepOneScreen}
            options={{ headerShown: false }}
          />
        </Fragment>
      )}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
