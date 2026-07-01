import React, { memo, ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  GestureResponderEvent,
  ColorValue
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { FontProps, FontWeight } from '@/utils/fonts-utils';
import { moderateScale, verticalScale } from '@/utils/scaling-utils';
import { commonColors } from '@/utils/theme';
import Text from './Text';
import Spacer from './Spacer';

type ButtonProps = {
  centered?: boolean;
  title?: string;
  loading?: boolean;
  border?: boolean;
  borderColor?: ColorValue;
  btnStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  font?: FontProps;
  weight?: FontWeight;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress: (event: GestureResponderEvent) => void | Promise<void>;
};

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.btnStyle, props.border && styles.border, props.centered && styles.centered]}
      disabled={props.loading}
      onPress={props.onPress}>
      {props.loading ? (
        <ActivityIndicator size="small" color={commonColors.white} style={{ alignSelf: 'center' }} />
      ) : (
        <View style={styles.row}>
          {props.leftIcon && (
            <>
              {props.leftIcon}
              <Spacer width={moderateScale(4)} />
            </>
          )}

          <Text
            textStyle={[styles.title, props.titleStyle]}
            font={props.font || 'p16'}
            weight={props.weight || 'InterMedium'}>
            {props.title}
          </Text>

          {props.rightIcon && (
            <>
              <Spacer width={moderateScale(4)} />
              {props.rightIcon}
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    width: '90%',
    height: verticalScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(theme.borderRadius.sm),
    backgroundColor: theme.colors.btn
  },
  centered: {
    alignSelf: 'center'
  },
  border: {
    borderWidth: 1,
    borderColor: commonColors.gray100,
    backgroundColor: commonColors.transparent
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: commonColors.white
  }
}));
