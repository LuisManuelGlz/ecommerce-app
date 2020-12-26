import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 23,
  },
  changeEmailContainer: {
    flexGrow: 1,
  },
  emailInput: {
    marginTop: 30,
  },
  changeEmailButton: {
    marginTop: 30,
  },
  advice: {
    flexGrow: 2,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  emailText: {
    color: Colors.primary,
  },
});
