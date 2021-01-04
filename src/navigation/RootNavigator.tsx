import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import AuthNavigator from './AuthNavigator';
import { AuthContext } from '../context/AuthContext';
import MainNavigator from './MainNavigator';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const {
    setUser,
    setPersonalDetails,
    isAuthCompleted,
    setIsAuthCompleted,
  } = useContext(AuthContext);

  // Set an initializing state whilst Firebase connects
  const [isLoading, setIsLoading] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    setIsLoading(true);
    setUser(user);
    if (user) {
      try {
        const documentSnapshot = await getUserInfo(user);
        if (documentSnapshot.exists) {
          const {
            fullName,
            address,
            cardNumber,
          } = documentSnapshot.data() as FirebaseFirestoreTypes.DocumentData;
          setPersonalDetails({ fullName, address, cardNumber });
          setIsAuthCompleted(true);
        } else {
          setIsAuthCompleted(false);
        }
      } catch (error) {
        console.log(error);
      }
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
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthCompleted ? (
        <RootStack.Screen name="Main" component={MainNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
