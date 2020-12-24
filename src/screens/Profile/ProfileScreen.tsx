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
import { IUserInfo } from '../../interfaces/userInfo';
import { Text, UserInfo } from '../../components';
import { AuthContext } from '../../context';
import styles from './ProfileScreen.styles';
import { Colors } from '../../styles';
import { AccountRoute, HistoryRoute } from './TabBarRoutes';

const initialLayout = { width: Dimensions.get('window').width };

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isLoading, setIsLoading] = useState(true);

  // index for TabView
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

  // TabView scenes
  const renderScene = SceneMap({
    account: AccountRoute,
    history: HistoryRoute,
    // history: () => <HistoryRoute orders={[{ id: '123', ... }]} />,
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

  if (isLoading) return null;

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
