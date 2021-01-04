import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  renderContent: {
    backgroundColor: Colors.darkKnight,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    height: 300,
  },
  messageContainer: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: Colors.light,
    width: 200,
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
  wishListButtonOn: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 51,
    height: 51,
  },
  wishListButtonOff: {
    backgroundColor: Colors.darkLighten,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 51,
    height: 51,
  },
  quantity: {
    height: '100%',
    width: 200,
    paddingHorizontal: 17,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderColor: Colors.light,
    borderWidth: 1,
  },
  removeProductButton: {
    backgroundColor: Colors.danger,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 51,
    height: 51,
  },
});
