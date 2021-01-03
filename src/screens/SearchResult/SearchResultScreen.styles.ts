import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  noProducts: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '30%',
  },
  searchTitle: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  searchInput: {
    backgroundColor: Colors.darkLighten,
    height: 36,
    width: 325,
    borderRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 23,
    marginBottom: 25,
    alignSelf: 'flex-end',
  },
});
