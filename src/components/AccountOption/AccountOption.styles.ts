import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    height: 50,
    backgroundColor: Colors.darkLighten,
  },
  title: {
    flexGrow: 2,
    marginLeft: 25,
  },
});