import React, { useEffect, useState } from 'react';
import { View, Button, Image, StyleProp, ViewStyle } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker/src';
import Text from '../Text';
import styles from './UserInfo.styles';
import { IUserInfo } from '../../interfaces/IUserInfo';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const UserInfo = ({ style }: Props) => {
  const [user, setUser] = useState<IUserInfo>();

  useEffect(() => {
    const user = auth().currentUser;
    setUser({ displayName: user?.displayName, photoURL: user?.photoURL });
  }, []);

  const chooseAvatar = () => {
    const { currentUser } = auth();

    launchImageLibrary({ mediaType: 'photo' }, async (response: any) => {
      if (response.error) {
        console.log('LaunchImageLibrary Error: ', response.error);
      } else {
        try {
          // set path that will save in firebase storage
          const reference = storage().ref(
            `${currentUser?.uid}/avatar/${response.fileName}`,
          );
          // upload file
          await reference.putFile(response.uri);
  
          // get photo url
          const photoURL = await reference.getDownloadURL();
          // update user avatar
          await currentUser?.updateProfile({
            photoURL: photoURL,
          });
          setUser({ ...user, photoURL });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <View style={style}>
      <Text size="h2" style={styles.fullName}>
        {user?.displayName}
      </Text>
      <View style={styles.userInfoContainer}>
        <View>
          <Image style={styles.avatar} source={{ uri: user?.photoURL! }} />
          <Button onPress={chooseAvatar} title="Cambiar avatar" />
        </View>
        <View style={styles.followingContainer}>
          <Text size="h3" style={styles.followingCount}>
            25
          </Text>
          <Text size="h5" style={styles.followingLabel}>
            Siguiendo
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
