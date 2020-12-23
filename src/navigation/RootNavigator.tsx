import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import TabsNavigator from './TabsNavigator';
import AuthNavigator from './AuthNavigator';
import { AuthContext } from '../context';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAuthCompleted, setIsAuthCompleted] = useState(false);

  // Handle user state changes
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    user && verifyIfSignUpIsComplete();
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const verifyIfSignUpIsComplete = () => {
    firestore()
      .collection('users')
      .doc(user?.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setIsAuthCompleted(true);
        }
      });
  };

  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{ user, isAuthCompleted, setIsAuthCompleted, initializing }}>
      <RootStack.Navigator>
        {isAuthCompleted ? (
          <RootStack.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </RootStack.Navigator>
    </AuthContext.Provider>
  );
};

export default RootNavigator;
