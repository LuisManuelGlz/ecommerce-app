import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import globalStyles from '../styles';
import styles from './H2.styles';

interface Props {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  primary?: boolean;
  danger?: boolean;
}

const H2 = (props: Props) => {
  const { colors } = useTheme();
  const customStyles = [{ color: colors.text }, styles.default, props.style];
  const { primary, danger } = props;

  if (primary) {
    customStyles.push(globalStyles.primary);
  }

  if (danger) {
    customStyles.push(globalStyles.danger);
  }

  return <Text style={customStyles} {...props} />;
};

export default H2;
