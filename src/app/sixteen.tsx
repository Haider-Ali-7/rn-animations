import ListItem2 from '@/components/ListItem2';
import React from 'react';
import { FlatList, StyleSheet, View, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));

const Sixteen = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingTop: 40 }}
        data={data}
        renderItem={({ item }) => <ListItem2 item={item} viewableItems={viewableItems} />}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={8}
        updateCellsBatchingPeriod={50}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
      />
    </View>
  );
};

export default Sixteen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
