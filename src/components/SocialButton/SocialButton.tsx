import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import styles from './SocialButton.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  google?: boolean;
  facebook?: boolean;
  twitter?: boolean;
  icon: any;
  onPress?: () => void;
}

const Primary = ({
  style,
  google,
  facebook,
  twitter,
  icon,
  onPress,
}: Props) => {
  const customStyle = [styles.default, style];

  if (google) {
    customStyle.push(styles.backgroundGoogle);
  } else if (facebook) {
    customStyle.push(styles.backgroundFacebook);
  } else if (twitter) {
    customStyle.push(styles.backgroundTwitter);
  }

  return (
    <TouchableOpacity style={customStyle} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default Primary;
