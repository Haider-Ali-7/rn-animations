import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import PressableScale from './pressable-scale';

import { W_WIDTH } from '@/utils/platforms-utils';

type splictAction = {
  label: string;
  onPress: () => void;
  backgroundColor: string;
};

interface SplitButtonProps {
  splitted: boolean;
  mainAction: splictAction;
  leftAction: splictAction;
  rightAction: splictAction;
}

const gap = 10;
const paddingHorizontal = 20;
const splittedBtnWidth = (W_WIDTH - paddingHorizontal * 2 - gap) / 2;

const SplitButton: React.FC<SplitButtonProps> = ({ splitted, mainAction, leftAction, rightAction }) => {
  const rLeftBtnStyle = useAnimatedStyle(() => {
    const leftBtnWidth = splitted ? splittedBtnWidth : 0;
    return {
      width: withTiming(leftBtnWidth),
      opacity: withTiming(splitted ? 1 : 0)
    };
  }, [splitted]);

  const rMainBtnStyle = useAnimatedStyle(() => {
    const mainBtnWidth = splitted ? splittedBtnWidth : splittedBtnWidth * 2;
    return {
      width: withTiming(mainBtnWidth),
      marginLeft: withTiming(splitted ? gap : 0),
      backgroundColor: withTiming(splitted ? rightAction.backgroundColor : mainAction.backgroundColor)
    };
  }, [splitted]);

  const rLeftTextStyle = useAnimatedStyle(() => {
    return { opacity: withTiming(splitted ? 1 : 0, { duration: 650 }) };
  }, [splitted]);

  const rMainTextStyle = useAnimatedStyle(() => {
    return { opacity: withTiming(splitted ? 0 : 1) };
  }, [splitted]);

  const rRightTextStyle = useAnimatedStyle(() => {
    return { opacity: withTiming(splitted ? 1 : 0) };
  }, [splitted]);

  return (
    <View style={[styles.container]}>
      <PressableScale
        onPress={leftAction.onPress}
        style={[styles.btn, { backgroundColor: leftAction.backgroundColor }, rLeftBtnStyle]}>
        <Animated.Text numberOfLines={1} style={[styles.text, rLeftTextStyle]}>
          {leftAction.label}
        </Animated.Text>
      </PressableScale>

      <PressableScale onPress={splitted ? rightAction.onPress : mainAction.onPress} style={[styles.btn, rMainBtnStyle]}>
        <Animated.Text style={[styles.text, rMainTextStyle]}>{mainAction.label}</Animated.Text>
        <Animated.Text style={[styles.text, rRightTextStyle]}>{rightAction.label}</Animated.Text>
      </PressableScale>
    </View>
  );
};

export default SplitButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingHorizontal
  },
  btn: {
    height: 60,
    overflow: 'hidden',
    borderRadius: 30,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textTransform: 'lowercase',
    letterSpacing: 2.5,
    position: 'absolute'
  }
});
