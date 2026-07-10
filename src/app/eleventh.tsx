import Ripple from '@/components/Ripple';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Eleventh = () => {
  return (
    <View style={styles.container}>
      <Ripple onTap={() => console.log('tap')}>
        <Text style={{ fontSize: 22 }}>Tap</Text>
      </Ripple>
    </View>
  );
};

export default Eleventh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
