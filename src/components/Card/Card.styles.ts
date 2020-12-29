import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.darkKnight,
    width: 300,
    height: 275,
    marginLeft: -50,
    marginBottom: 20,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '65%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  footerContainer: {
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 160,
    height: 40,
  },
});
