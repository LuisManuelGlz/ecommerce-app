import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  inputStyle: {
    height: 54,
  },
  addPaymentMethodButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.light,
    position: 'absolute',
    right: 16,
    bottom: 19,
  },
});
