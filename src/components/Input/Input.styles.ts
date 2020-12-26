import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkLighten,
    height: 36,
    paddingLeft: 20,
    paddingRight: 6,
    borderRadius: 8,
    width: '100%',
  },
  inputWithIconOutside: {
    width: '90%'
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    color: Colors.light
  },
});
