import { ImageProps } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import CircleCarouselListItem, { ListItemWidth } from './list-item';

interface CircleCarouselProps {
  data: ImageProps['source'][];
}

const CircleCarousel: React.FC<CircleCarouselProps> = ({ data }) => {
  const contentOffset = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    contentOffset.value = e.contentOffset.x;
  });

  return (
    <Animated.FlatList
      style={{ position: 'absolute', bottom: 0, height: 300 }}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingRight: 200 }}
      pagingEnabled
      snapToInterval={ListItemWidth}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16} // 60fps -> 16ms fire onScroll each 16ms
      onScroll={onScroll}
      keyExtractor={(_, index) => index.toString()}
      data={data}
      renderItem={({ item, index }) => (
        <CircleCarouselListItem contentOffset={contentOffset} imageSrc={item} index={index} />
      )}
    />
  );
};

export default CircleCarousel;

const styles = StyleSheet.create({});
