import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'red',
  },
  fullName: {
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderColor: Colors.primary,
    borderWidth: 3,
    borderRadius: 100,
  },
  userInfoContainer: {
    flexDirection: 'row',
    paddingLeft: 30,
  },
  followingContainer: {
    marginLeft: 20,
  },
  followingCount: {
    fontWeight: '700',
  },
  followingLabel: {
    color: Colors.light,
    fontWeight: '400',
  },
});
