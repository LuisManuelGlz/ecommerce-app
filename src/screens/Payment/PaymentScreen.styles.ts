import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addressCard: {
    marginTop: 14,
    height: 100,
    backgroundColor: Colors.darkKnight,
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 8,
  },
  addressCardHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  creditCard: {
    marginTop: 14,
    height: 100,
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 8,
  },
  creditCardHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  sumContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sum: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 50,
  },
});
