import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  default: {
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backgroundGoogle: {
    backgroundColor: Colors.google,
  },
  backgroundFacebook: {
    backgroundColor: Colors.light,
  },
  backgroundTwitter: {
    backgroundColor: Colors.twitter,
  },
});
