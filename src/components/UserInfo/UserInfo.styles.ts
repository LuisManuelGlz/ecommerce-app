import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  fullName: {
    marginTop: 40,
    textAlign: 'center',
  },
  userInfoContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    paddingLeft: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderColor: Colors.primary,
    borderWidth: 3,
    borderRadius: 100,
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
