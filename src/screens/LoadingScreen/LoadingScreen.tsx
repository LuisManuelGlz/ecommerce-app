import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Colors } from '../../styles';
import styles from './LoadingScreen.styles';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default LoadingScreen;
