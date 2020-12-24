import React from 'react';
import auth from '@react-native-firebase/auth';
import { Button, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          auth().signOut();
        }}></Button>
    </View>
  );
};

export default HomeScreen;
