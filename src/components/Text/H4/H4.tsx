import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '@react-navigation/native';
import globalStyles from '../styles';
import styles from './H4.styles';

interface Props extends TextProps {
  children: React.ReactNode;
  primary?: boolean;
  danger?: boolean;
}

const H4 = (props: Props) => {
  const { colors } = useTheme();
  const customStyles = [{ color: colors.text }, styles.default, props.style];
  const { primary, danger } = props;

  if (primary) {
    customStyles.push(globalStyles.primary);
  }

  if (danger) {
    customStyles.push(globalStyles.danger);
  }

  return <Text {...props} style={customStyles} />;
};

export default H4;
