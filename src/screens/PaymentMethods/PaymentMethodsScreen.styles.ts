import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 25,
    paddingHorizontal: 20,
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
  renderContent: {
    backgroundColor: Colors.darkKnight,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    height: 525,
  },
  messageContainer: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: Colors.light,
    width: 200,
  },
  inputStyle: {
    height: 64,
  },
  renderBackDrop: {
    backgroundColor: '#979797',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backDropTouchable: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
