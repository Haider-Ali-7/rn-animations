import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { moderateScale, verticalScale } from '@/utils/scaling-utils';
import Spacer from './Spacer';
import Divider from './Divider';
import Text from './Text';

interface HeadingProps {
  title: string;
  rightIcon?: ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ title, rightIcon }) => {
  return (
    <>
      <Spacer height={verticalScale(8)} />
      <View style={styles.row}>
        <Text font="p16" weight="InterSemiBold" textStyle={styles.heading}>
          {title}
        </Text>
        {rightIcon && (
          <>
            <Spacer width={moderateScale(6)} />
            {rightIcon}
          </>
        )}
      </View>
      <Divider />
    </>
  );
};

export default React.memo(Heading);

const styles = StyleSheet.create(theme => ({
  row: {
    marginHorizontal: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center'
  },
  heading: {
    textAlign: 'left',
    textTransform: 'uppercase',
    color: theme.colors.activeTint
  }
}));
