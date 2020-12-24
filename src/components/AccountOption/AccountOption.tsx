import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../Text';
import styles from './AccountOption.styles';

interface Props extends TouchableOpacityProps {
  title?: string;
  iconLeft?: any;
  iconRight?: any;
}

const AccountOption = ({
  style,
  title,
  iconLeft,
  iconRight,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <View>{iconLeft}</View>
      <Text style={styles.title} size="h3">
        {title}
      </Text>
      <View>{iconRight}</View>
    </TouchableOpacity>
  );
};

export default AccountOption;
