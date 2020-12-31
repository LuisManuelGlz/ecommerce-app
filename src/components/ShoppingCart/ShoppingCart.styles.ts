import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  icon: {
    marginRight: 20,
  },
  badge: {
    backgroundColor: Colors.danger,
    padding: 5,
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    right: 10,
  },
});
