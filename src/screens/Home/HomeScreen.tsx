import React, { useContext } from 'react';
import auth from '@react-native-firebase/auth';
import { Button, View } from 'react-native';
import { AuthContext } from '../../context';

const HomeScreen = () => {
  const { setIsAuthCompleted } = useContext(AuthContext);
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              setIsAuthCompleted(false);
            });
        }}></Button>
    </View>
  );
};

export default HomeScreen;
