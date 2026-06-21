import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

interface SafeViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const SafeView: React.FC<SafeViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={['']}>
      {children}
    </SafeAreaView>
  );
};

export default SafeView;

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));
