import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addressCard: {
    marginTop: 14,
    height: 184,
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
  addPaymentMethodButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.light,
    position: 'absolute',
    right: 16,
    bottom: 19,
  },
});
