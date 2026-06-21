import React from 'react';
import { View } from 'react-native';
import Divider from './Divider';
import Button from './Button';
import TextInput from './TextInput';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import Text from './Text';
import Spacer from './Spacer';
import { moderateScale, verticalScale } from '@/utils/scaling-utils';

interface HeadingAndSearchProps {
  heading?: string;
}

const HeadingAndSearch: React.FC<HeadingAndSearchProps> = ({ heading }) => {
  const { theme } = useUnistyles();
  return (
    <View>
      <Spacer height={verticalScale(8)} />
      <Text textStyle={styles.heading} font="p16" weight="InterBold">
        {heading}
      </Text>

      <Divider bgColor={theme.colors.border} />

      <View style={styles.row}>
        <TextInput placeholder="Search" style={styles.input} />
        <Button btnStyle={styles.btnStyle} title="GO" onPress={() => {}} />
      </View>
    </View>
  );
};

export default HeadingAndSearch;

const styles = StyleSheet.create(theme => ({
  heading: {
    marginLeft: moderateScale(9),
    textTransform: 'uppercase',
    color: theme.colors.activeTint
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    flex: 0.7,
    height: verticalScale(32),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(theme.borderRadius.sm),
    borderColor: theme.colors.border_input,
    backgroundColor: theme.colors.tp
  },
  btnStyle: {
    flex: 0.2
  }
}));
