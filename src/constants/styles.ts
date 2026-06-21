import { StyleSheet } from 'react-native-unistyles';

const SIZE = 100;

export default StyleSheet.create((theme, rt) => ({
  fill: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg1
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white
  },
  box: {
    height: SIZE,
    width: SIZE,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 256, 0.5)'
  }
}));
