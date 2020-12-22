import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from 'react-native';
import styles from './Button.styles';

interface Props extends TouchableOpacityProps {
  block?: boolean;
  title?: string;
  background?: 'primary' | 'danger' | 'google' | 'facebook' | 'twitter';
  icon?: any;
}

const Button = ({ style, title, block, background, icon, ...rest }: Props) => {
  const customStyles = [styles.default, !icon && styles.buttonHasIcon, style];

  const applyButtonBackground = {
    primary: () => customStyles.push(styles.backgroundPrimary),
    danger: () => customStyles.push(styles.backgroundDanger),
    google: () => customStyles.push(styles.backgroundGoogle),
    facebook: () => customStyles.push(styles.backgroundFacebook),
    twitter: () => customStyles.push(styles.backgroundTwitter),
  };

  if (block) {
    customStyles.push(styles.block);
  }

  if (background) {
    applyButtonBackground[background]();
  }

  return (
    <TouchableOpacity style={customStyles} {...rest}>
      {icon && <View style={styles.buttonIcon}>{icon}</View>}
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
