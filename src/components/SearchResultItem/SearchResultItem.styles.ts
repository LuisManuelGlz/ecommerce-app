import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: Colors.darkKnight,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 15,
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: 55,
    height: 50,
  },
  details: {
    width: '60%',
    marginLeft: 10,
  },
  deleteButton: {
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.danger,
    position: 'absolute',
    top: 5,
    right: 10,
  }
});
