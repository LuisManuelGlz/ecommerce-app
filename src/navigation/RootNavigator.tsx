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
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAuthCompleted, setIsAuthCompleted] = useState(false);

  // Handle user state changes
  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    setIsLoading(true);
    setUser(user);
    if (user) {
      await getUserInfo(user).then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setIsAuthCompleted(true);
        } else {
          setIsAuthCompleted(false);
        }
      });
    } else {
      setIsAuthCompleted(false);
    }
    setIsLoading(false);
  };
  
  const getUserInfo = (user: FirebaseAuthTypes.User) => {
    return firestore().collection('users').doc(user.uid).get();
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{ user, setIsAuthCompleted }}>
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
