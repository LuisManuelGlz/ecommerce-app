import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  default: {
    flexDirection: 'row',
    borderRadius: 50,
    width: 300,
    height: 51,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  buttonHasIcon: {
    justifyContent: 'center',
  },
  backgroundPrimary: {
    backgroundColor: Colors.primary,
  },
  backgroundGoogle: {
    backgroundColor: Colors.google,
  },
  backgroundFacebook: {
    backgroundColor: Colors.facebook,
  },
  backgroundTwitter: {
    backgroundColor: Colors.twitter,
  },
  backgroundDanger: {
    backgroundColor: Colors.danger,
  },
  buttonIcon: {
    marginRight: 25,
    marginLeft: 10,
  },
  buttonTitle: {
    color: Colors.light,
    fontSize: 16,
  },
  block: {
    width: '100%',
  },
});
