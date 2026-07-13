import CircleCarousel from '@/components/CircleCarousel/CircleCarousel';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const data = [
  require('@/assets/images/00.jpg'),
  require('@/assets/images/00.jpg'),
  require('@/assets/images/00.jpg'),
  require('@/assets/images/00.jpg'),
  require('@/assets/images/00.jpg'),
  require('@/assets/images/00.jpg'),
  require('@/assets/images/00.jpg'),
  require('@/assets/images/00.jpg'),
  require('@/assets/images/00.jpg'),
  require('@/assets/images/00.jpg')
];

const Eighteen = () => {
  return (
    <View style={styles.container}>
      <CircleCarousel data={data} />
    </View>
  );
};

export default Eighteen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
