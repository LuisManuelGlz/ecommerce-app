import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    height: 60,
    backgroundColor: Colors.darkLighten,
  },
  orderNumber: {
    marginLeft: 15,
  },
});