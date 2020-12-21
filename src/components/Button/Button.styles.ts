import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  default: {
    borderRadius: 50,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  backgroundPrimary: {
    backgroundColor: Colors.primary,
  },
  backgroundDanger: {
    backgroundColor: Colors.danger,
  },
  buttonTitle: {
    color: Colors.light,
    textAlign: 'center',
    fontSize: 16,
  },
  block: {
    width: '100%',
  },
});
