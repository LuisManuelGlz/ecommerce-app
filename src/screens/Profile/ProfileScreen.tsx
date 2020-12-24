import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IUserInfo } from '../../interfaces/userInfo';
import { AccountOption, HistoryOrder, Text, UserInfo } from '../../components';
import { AuthContext } from '../../context';
import styles from './ProfileScreen.styles';
import { Colors } from '../../styles';

const initialLayout = { width: Dimensions.get('window').width };

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'account', title: 'Cuenta' },
    { key: 'history', title: 'Historial' },
  ]);

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

  const AccountRoute = () => {
    return (
      <ScrollView style={[styles.scene, styles.accountOptionContainer]}>
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
      </ScrollView>
    );
  };

  const HistoryRoute = () => {
    return (
      <ScrollView style={[styles.scene, styles.historyOrderContainer]}>
        <Text style={styles.noOrdersYet} size="h2">No hay órdenes aún</Text>
        {/* <HistoryOrder style={styles.historyOrder} orderNumber="1" />
        <HistoryOrder style={styles.historyOrder} orderNumber="1" />
        <HistoryOrder style={styles.historyOrder} orderNumber="1" />
        <HistoryOrder style={styles.historyOrder} orderNumber="1" />
        <HistoryOrder style={styles.historyOrder} orderNumber="1" />
        <HistoryOrder style={styles.historyOrder} orderNumber="1" />
        <HistoryOrder style={styles.historyOrder} orderNumber="1" />
        <HistoryOrder style={styles.historyOrder} orderNumber="1" />
        <HistoryOrder style={styles.historyOrder} orderNumber="10" /> */}
      </ScrollView>
    );
  };

  const renderScene = SceneMap({
    account: AccountRoute,
    history: HistoryRoute,
  });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    },
  ) => (
    <TabBar
      {...props}
      renderLabel={({ route, color }) => (
        <Text size="h3" style={{ color, margin: 8 }}>
          {route.title}
        </Text>
      )}
      activeColor={Colors.primary}
      inactiveColor={Colors.light}
      indicatorStyle={styles.tabBarIndicator}
      style={styles.tabBar}
    />
  );

  return (
    <Fragment>
      <UserInfo userInfo={userInfo!} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Fragment>
  );
};

export default ProfileScreen;
