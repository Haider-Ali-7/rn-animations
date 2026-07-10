import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

const LIST_ITEM_COLOR = '#1798DE';

interface Item {
  id: number;
}

const Fifteen = () => {
  const initialMode = useRef(true);
  const [items, setItems] = useState<Item[]>(new Array(5).fill(0).map((_, index) => ({ id: index })));

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const onAdd = useCallback(() => {
    setItems(prev => {
      const newId = (prev[prev.length - 1]?.id ?? -1) + 1;
      return [...prev, { id: newId }];
    });
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setItems(prev => prev.filter(el => el.id != itemId));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingBtn} onPress={onAdd}>
        <Text style={{ color: 'white', fontSize: 40 }}>+</Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 50 }}>
        {items.map((el, index) => (
          <Animated.View
            key={el.id}
            style={styles.listItem}
            entering={initialMode.current ? FadeIn.delay(150 * index) : FadeIn}
            exiting={FadeOut}
            layout={LinearTransition.delay(100)}
            onTouchEnd={() => onDelete(el.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Fifteen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 5
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 50,
    right: '5%',
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'black',
    borderRadius: 40,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
