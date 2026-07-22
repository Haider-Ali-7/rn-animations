import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';

import StoryListItem, { height, width } from '@/components/story-list-item';
import { palette } from '@/constants/Colors';
import { W_WIDTH } from '@/utils/platforms-utils';

const stories = [
  {
    image:
      'https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    image:
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    image:
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    image:
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
  }
];

const ListPadding = W_WIDTH - width;

const TwentyFive = () => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={animatedRef}
        scrollEventThrottle={16}
        snapToInterval={width}
        decelerationRate={'fast'}
        disableIntervalMomentum
        horizontal
        contentContainerStyle={{ alignSelf: 'center', height: height, width: width * stories.length + ListPadding }}>
        {stories.map((el, index) => {
          return <StoryListItem key={index} index={index} imageSrc={el.image} scrollOffset={scrollOffset} />;
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default TwentyFive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColor2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
