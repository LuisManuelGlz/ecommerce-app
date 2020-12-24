import React from 'react';
import { View, Image, StyleProp, ViewStyle } from 'react-native';
import Text from '../Text';
import styles from './UserInfo.styles';
import { IUserInfo } from '../../interfaces/userInfo';

interface Props {
  style?: StyleProp<ViewStyle>;
  userInfo: IUserInfo;
}

const UserInfo = ({ style, userInfo }: Props) => {
  return (
    <View style={styles.container}>
      <Text size="h2" style={styles.fullName}>
        {userInfo.fullName}
      </Text>
      <View style={[styles.userInfoContainer, style]}>
        <Image style={styles.avatar} source={{ uri: userInfo.avatar }} />
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
