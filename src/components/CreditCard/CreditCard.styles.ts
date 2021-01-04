import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export default StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    borderRadius: 12,
    width: 344,
    height: 216,
    marginBottom: 20,
    position: 'relative',
    backgroundColor: '#00ADB5',
    overflow: 'hidden',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  rightCircle: {
    backgroundColor: '#f9a000',
    position: 'absolute',
    left: 20,
  },
  leftCircle: {
    backgroundColor: '#ed0006',
    zIndex: 999,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  cardNumberPart: {
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 4,
    backgroundColor: Colors.light,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Courier',
    fontSize: 16,
    letterSpacing: 0.53,
    color: Colors.light,
  },
  bgCircle: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.05,
    height: 250,
    width: 250,
    borderRadius: 250,
  },
  rightBgCircle: {
    top: (-1 * 250) / 4,
    right: (-1 * 250) / 2,
  },
  bottomBgCircle: {
    bottom: (-1 * 250) / 2,
    left: (0 * (-1 * 250)) / 2,
  },
});
