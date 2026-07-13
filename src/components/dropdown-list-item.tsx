import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

import { W_HEIGHT, W_WIDTH } from '@/utils/platforms-utils';

export type DropdownItemType = {
  label: string;
  iconName: string;
};

type DropdownItemTypeProps = DropdownItemType & {
  index: number;
  dropdownItemCount: number;
  isExpanded: SharedValue<boolean>;
};

const DropdownListItem: React.FC<DropdownItemTypeProps> = ({
  label,
  iconName,
  index,
  isExpanded,
  dropdownItemCount
}) => {
  const Margin = 10;
  const isHeader = index === 0;
  const DropdownListItemHeight = 85;

  const contentHeight = dropdownItemCount * (DropdownListItemHeight + Margin);
  const verticalCenterOffset = (W_HEIGHT - contentHeight) / 2;

  const collapsedTop = verticalCenterOffset + (contentHeight / 2 - DropdownListItemHeight);
  const expandedTop = verticalCenterOffset + (DropdownListItemHeight + Margin) * index;

  const collapsedScale = 1 - index * 0.08;
  const expandedScale = 1;

  const rViewStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
      transform: [{ scale: withSpring(isExpanded.value ? expandedScale : collapsedScale) }, { translateY: 0 }]
    };
  }, []);

  const rIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isExpanded.value ? '90deg' : '0deg', { duration: 300 }) }]
    };
  }, []);

  return (
    <Animated.View
      onTouchEnd={() => {
        if (isHeader) isExpanded.value = !isExpanded.value;
      }}
      style={[
        {
          zIndex: dropdownItemCount - index,
          position: 'absolute',
          width: W_WIDTH * 0.95,
          height: DropdownListItemHeight,
          backgroundColor: '#1b1b1b',
          borderRadius: 10
        },
        rViewStyle
      ]}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <AntDesign name={iconName} color={'#d4d4d4'} size={25} />
        </View>
        <Text style={styles.label}>{label}</Text>
        <Animated.View style={[styles.iconContainer, { backgroundColor: 'transparent' }, isHeader && rIconStyle]}>
          <MaterialIcons name={'arrow-forward-ios'} color={'#d4d4d4'} size={25} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default DropdownListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    color: '#d4d4d4',
    fontSize: 22,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  iconContainer: {
    width: 45,
    aspectRatio: 1,
    backgroundColor: '#111',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
