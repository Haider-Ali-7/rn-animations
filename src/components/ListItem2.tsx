import React from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface ListItem2Props {
  viewableItems: SharedValue<ViewToken[]>;
  item: { id: number };
}

const ListItem2: React.FC<ListItem2Props> = ({ viewableItems, item }) => {
  const rViewStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(viewableItems.value.some(el => el.item.id == item.id));

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }]
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 80,
          width: '90%',
          backgroundColor: '#78cad2',
          alignSelf: 'center',
          borderRadius: 15,
          marginTop: 20
        },
        rViewStyle
      ]}
    />
  );
};

export default React.memo(ListItem2);

const styles = StyleSheet.create({});
