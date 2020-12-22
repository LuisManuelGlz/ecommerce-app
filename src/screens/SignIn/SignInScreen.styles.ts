import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 37,
    paddingTop: 75,
    paddingBottom: 50,
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
  },
  formContainer: {
    flexGrow: 1,
  },
  fieldContainer: {
    marginVertical: 5,
  },
  buttonsContainer: {
    flexGrow: 3
  },
  signInButton: {
    marginTop: 10,
  },
  goToSignUpText: {
    textAlign: 'center',
    color: Colors.light,
  }
});
