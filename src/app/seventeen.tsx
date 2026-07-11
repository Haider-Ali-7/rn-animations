import Dropdown from '@/components/Dropdown';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const options = [
  { label: 'Charts', iconName: 'barschart' },
  { label: 'Book', iconName: 'book' },
  { label: 'Calendar', iconName: 'calendar' },
  { label: 'Camera', iconName: 'camera' }
];

const header = {
  label: 'Header',
  iconName: 'ellipsis1'
};

const Seventeen = () => {
  return (
    <View style={styles.container}>
      <Dropdown header={header} options={options} />
    </View>
  );
};

export default Seventeen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
