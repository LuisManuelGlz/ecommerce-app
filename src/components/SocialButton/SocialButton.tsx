import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import styles from './SocialButton.styles';

interface Props extends TouchableOpacityProps {
  background: 'google' | 'facebook' | 'twitter';
  icon: any;
}

const SocialButton = ({ style, background, icon, ...rest }: Props) => {
  const customStyles = [styles.default, style];

  const applyButtonBackground = {
    google: () => customStyles.push(styles.backgroundGoogle),
    facebook: () => customStyles.push(styles.backgroundFacebook),
    twitter: () => customStyles.push(styles.backgroundTwitter),
  };

  if (background) {
    applyButtonBackground[background]();
  }

  return (
    <TouchableOpacity style={customStyles} {...rest}>
      {icon}
    </TouchableOpacity>
  );
};

export default SocialButton;
