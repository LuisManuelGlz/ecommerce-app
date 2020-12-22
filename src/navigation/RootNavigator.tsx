import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import TabsNavigator from './TabsNavigator';
import AuthNavigator from './AuthNavigator';

const RootStack = createStackNavigator();

interface Props {
  isAuthenticated: string;
}

const RootNavigator = ({ isAuthenticated }: Props) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return user ? (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  ) : (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
