import React from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import Animated, {
  cancelAnimation,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

interface ListItem2Props {
  viewableItems: SharedValue<ViewToken[]>;
  item: { id: number };
}

const ListItem2: React.FC<ListItem2Props> = ({ viewableItems, item }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.6);

  useAnimatedReaction(
    () => viewableItems.value.some(el => el.item.id === item.id),
    (isVisible, wasVisible) => {
      if (isVisible !== wasVisible) {
        cancelAnimation(opacity);
        cancelAnimation(scale);
        opacity.value = withTiming(isVisible ? 1 : 0);
        scale.value = withTiming(isVisible ? 1 : 0.6);
      }
    }
  );

  const rViewStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));

  return <Animated.View style={[styles.item, rViewStyle]} />;
};

export default React.memo(ListItem2);

const styles = StyleSheet.create({
  item: {
    height: 80,
    width: '90%',
    backgroundColor: '#78cad2',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20
  }
});
