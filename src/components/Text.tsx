import React, { memo } from 'react';
import { Text as RNText, TextProps, ColorValue, StyleProp, TextStyle } from 'react-native';
import fonts, { FontProps, FontWeight } from '@/utils/fonts-utils';
import { StyleSheet } from 'react-native-unistyles';

type TextProps1 = {
  centered?: boolean;
  flex?: boolean;
  font?: FontProps;
  weight?: FontWeight;
  color?: ColorValue;
  textStyle?: StyleProp<TextStyle>;
};

type Props = TextProps & TextProps1;

const Text: React.FC<Props> = props => {
  return (
    <RNText
      allowFontScaling={false}
      style={[
        props.textStyle,
        props.flex && styles.flex,
        props.centered && styles.centered,
        props.color && { color: props.color },
        { ...fonts[props.font ?? 'h20'](props.weight) }
      ]}
      {...props}>
      {props.children}
    </RNText>
  );
};

export default memo(Text);

const styles = StyleSheet.create(theme => ({
  centered: {
    textAlign: 'center'
  },
  flex: {
    flex: 1
  }
}));
