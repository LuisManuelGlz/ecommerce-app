import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  details: {
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wishListButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 51,
    height: 51,
  },
});
