import SlidingCounter from '@/components/SlidingCounter';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Thirteen = () => {
  return (
    <View style={styles.container}>
      <SlidingCounter />
    </View>
  );
};

export default Thirteen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
