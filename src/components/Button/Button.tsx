import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import styles from './Button.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  block?: boolean;
  title?: string;
  primary?: boolean;
  google?: boolean;
  facebook?: boolean;
  twitter?: boolean;
  danger?: boolean;
  icon?: any;
  onPress?: () => void;
}

const Primary = ({
  style,
  block,
  title,
  primary,
  google,
  facebook,
  twitter,
  danger,
  icon,
  onPress,
}: Props) => {
  const customStyle = [styles.default, !icon && styles.buttonHasIcon, style];

  if (block) {
    customStyle.push(styles.block);
  }

  if (primary) {
    customStyle.push(styles.backgroundPrimary);
  } else if (google) {
    customStyle.push(styles.backgroundGoogle);
  } else if (facebook) {
    customStyle.push(styles.backgroundFacebook);
  } else if (twitter) {
    customStyle.push(styles.backgroundTwitter);
  } else if (danger) {
    customStyle.push(styles.backgroundDanger);
  }

  return (
    <TouchableOpacity style={customStyle} onPress={onPress}>
      {icon && <View style={styles.buttonIcon}>{icon}</View>}
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Primary;
