import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IUserInfo } from '../../interfaces/userInfo';
import { AccountOption, Text, UserInfo } from '../../components';
import { AuthContext } from '../../context';
import styles from './ProfileScreen.styles';
import { Colors } from '../../styles';

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    firestore()
      .collection('users')
      .doc(user!.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserInfo(documentSnapshot.data() as IUserInfo);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return null;

  return (
    <View style={styles.container}>
      <UserInfo style={styles.userInfo} userInfo={userInfo!} />
      <View style={styles.accountOptionContainer}>
        <AccountOption
          style={styles.accountOption}
          title="Cuenta de banco"
          iconLeft={<Ionicons name="card" size={25} color={Colors.light} />}
          iconRight={
            <Ionicons name="chevron-forward" size={30} color={Colors.light} />
          }
        />
        <AccountOption
          style={styles.accountOption}
          title="Notificaciones"
          iconLeft={
            <Ionicons name="notifications" size={25} color={Colors.light} />
          }
          iconRight={
            <Ionicons name="chevron-forward" size={30} color={Colors.light} />
          }
        />
        <AccountOption
          style={styles.accountOption}
          title="Cambiar dirección"
          iconLeft={
            <Ionicons name="location-sharp" size={25} color={Colors.light} />
          }
          iconRight={
            <Ionicons name="chevron-forward" size={30} color={Colors.light} />
          }
        />
        <AccountOption
          style={styles.accountOption}
          title="Cambiar correo"
          iconLeft={<Ionicons name="mail" size={25} color={Colors.light} />}
          iconRight={
            <Ionicons name="chevron-forward" size={30} color={Colors.light} />
          }
        />
        <AccountOption
          style={styles.accountOption}
          title="Cambiar contraseña"
          iconLeft={
            <Ionicons name="lock-closed" size={25} color={Colors.light} />
          }
          iconRight={
            <Ionicons name="chevron-forward" size={30} color={Colors.light} />
          }
        />
        <AccountOption
          style={styles.accountOptionSignOut}
          title="Cerrar sesión"
          iconLeft={<Ionicons name="log-out" size={25} color={Colors.light} />}
          onPress={() => {
            auth().signOut();
          }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
