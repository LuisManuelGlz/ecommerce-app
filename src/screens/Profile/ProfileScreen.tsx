import React, { Fragment, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import { Text, UserInfo } from '../../components';
import styles from './ProfileScreen.styles';
import { Colors } from '../../styles';
import { AccountRoute, HistoryRoute } from './TabBarRoutes';

const initialLayout = { width: Dimensions.get('window').width };

const ProfileScreen = () => {
  // index for TabView
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'account', title: 'Cuenta' },
    { key: 'history', title: 'Historial' },
  ]);

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

  return (
    <Fragment>
      <UserInfo />
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
