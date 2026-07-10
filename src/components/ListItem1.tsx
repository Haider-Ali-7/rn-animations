import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { TaskInterface } from '@/app/tenth';
import { W_WIDTH } from '@/utils/platforms-utils';

interface ListItem1Props {
  task: TaskInterface;
  onDismiss?: (task: TaskInterface) => void;
}

const LIST_ITEM_HEIGHT = 70;
const TRANSLATE_X_THRESHOLD = W_WIDTH * 0.3;

const ListItem1: React.FC<ListItem1Props> = ({ task, onDismiss }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const onPan = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value <= -TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-W_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished && onDismiss) runOnJS(onDismiss)(task);
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const rViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    };
  });

  const rIconStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value <= -TRANSLATE_X_THRESHOLD ? 0 : 1);
    return { opacity };
  });

  const rContainerStyle = useAnimatedStyle(() => {
    return { height: itemHeight.value, marginVertical: marginVertical.value, opacity: opacity.value };
  });

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconStyle]}>
        <FontAwesome5 name="trash-alt" size={LIST_ITEM_HEIGHT * 0.3} color="red" />
      </Animated.View>

      <GestureDetector gesture={onPan}>
        <Animated.View style={[styles.task, rViewStyle]}>
          <Text>{task.title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default ListItem1;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  task: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 20,
    elevation: 5
  },
  title: {
    fontSize: 16
  },
  iconContainer: {
    width: LIST_ITEM_HEIGHT,
    height: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
