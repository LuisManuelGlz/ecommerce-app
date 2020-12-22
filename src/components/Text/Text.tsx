import React from 'react';
import { Text, TextProps } from 'react-native';
import styles from './Text.styles';

interface Props extends TextProps {
  children: React.ReactNode;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: 'primary' | 'danger';
}

const H1 = ({ size, color, style, ...rest }: Props) => {
  const customStyles = [styles.default, style];

  const applyTextSize = {
    h1: () => customStyles.push(styles.h1),
    h2: () => customStyles.push(styles.h2),
    h3: () => customStyles.push(styles.h3),
    h4: () => customStyles.push(styles.h4),
    h5: () => customStyles.push(styles.h5),
    h6: () => customStyles.push(styles.h6),
  };

  const applyTextColor = {
    primary: () => customStyles.push(styles.primary),
    danger: () => customStyles.push(styles.danger),
  };

  if (size) {
    applyTextSize[size]();
  }

  if (color) {
    applyTextColor[color]();
  }

  return <Text {...rest} style={customStyles} />;
};

export default H1;
