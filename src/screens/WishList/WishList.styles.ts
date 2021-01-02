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
});
