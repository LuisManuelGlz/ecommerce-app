import React from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../../styles';
import styles from './Button.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  block?: boolean;
  title?: string;
  primary?: boolean;
  danger?: boolean;
  icon?: any;
  onPress?: () => void;
}

const Primary = ({
  style,
  block,
  title,
  primary,
  danger,
  icon,
  onPress,
}: Props) => {
  const customStyle = [styles.default, style];

  if (block) {
    customStyle.push(styles.block);
  }

  if (primary) {
    customStyle.push(styles.backgroundPrimary);
  } else if (danger) {
    customStyle.push(styles.backgroundDanger);
  }

  return (
    <TouchableOpacity style={customStyle} onPress={onPress}>
      <Text style={styles.buttonTitle}>
        {icon}
        {icon?.title && ' '}
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Primary;
