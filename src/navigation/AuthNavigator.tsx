import React, { Fragment, useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-community/google-signin';
import { NativeModules } from 'react-native';
import IntroScreen from '../screens/Intro';
import SignInScreen from '../screens/SignIn';
import SignUpStepOneScreen from '../screens/SignUpStepOne';
import SignUpStepTwoScreen from '../screens/SignUpStepTwo';
import { AuthContext } from '../context/AuthContext';
import config from '../config';

const AuthStack = createStackNavigator();
const { RNTwitterSignIn } = NativeModules;

const AuthNavigator = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure({ webClientId: config.googleSignInWebClientId });
    RNTwitterSignIn.init(
      config.twitterConsumerKey,
      config.twitterConsumerSecret,
    );
  }, []);

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <AuthStack.Screen
          name="SignUpStepTwo"
          component={SignUpStepTwoScreen}
        />
      ) : (
        <Fragment>
          <AuthStack.Screen name="Intro" component={IntroScreen} />
          <AuthStack.Screen name="SignIn" component={SignInScreen} />
          <AuthStack.Screen
            name="SignUpStepOne"
            component={SignUpStepOneScreen}
          />
        </Fragment>
      )}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
