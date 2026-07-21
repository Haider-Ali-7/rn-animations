import Checkbox from '@/components/checkbox';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BestCuisine = 'Italian';
const Cuisines = new Array(20).fill(BestCuisine).map((el, i) => ({
  id: i,
  name: el,
  selected: false
}));

const TwentyFour = () => {
  const [cuisines, setCuisines] = useState(Cuisines);

  const toggleCuisine = useCallback((id: number) => {
    setCuisines(prev => {
      return prev.map(el => {
        if (el.id == id) {
          return {
            ...el,
            selected: !el.selected
          };
        }
        return el;
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are your favorite cuisines?</Text>
      <View style={styles.listContainer}>
        {cuisines.map((el, i) => {
          return <Checkbox key={i} label={el.name} checked={el.selected} onPress={() => toggleCuisine(el.id)} />;
        })}
      </View>
    </View>
  );
};

export default TwentyFour;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 24
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
    justifyContent: 'center'
  }
});
