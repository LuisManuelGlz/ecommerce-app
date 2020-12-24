import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Colors.darkLighten,
    height: 60,
  },
  tabBarIndicator: {
    backgroundColor: Colors.primary,
    height: 4,
  },
  accountOptionContainer: {
    paddingHorizontal: 27,
  },
  accountOption: {
    marginVertical: 10,
  },
  accountOptionSignOut: {
    marginVertical: 40,
  },
  historyOrderContainer: {
    paddingHorizontal: 28,
  },
  historyOrder: {
    marginVertical: 10,
  },
  noOrdersYet: {
    marginTop: 20,
    textAlign: 'center',
  },
});
