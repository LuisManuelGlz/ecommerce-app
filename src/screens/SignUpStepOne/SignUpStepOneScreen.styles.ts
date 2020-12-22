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
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
  },
  lineHorizontal: {
    borderBottomColor: Colors.light,
    borderBottomWidth: 1,
    width: 65,
  },
  formContainer: {
    flexGrow: 2,
  },
  fieldContainer: {
    marginVertical: 5,
  },
  checkBoxFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  buttonsContainer: {
    flexGrow: 1
  },
  goToSignInText: {
    textAlign: 'center',
    color: Colors.light,
  }
});
