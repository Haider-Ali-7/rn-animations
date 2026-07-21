import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import SplitButton from '@/components/split-button';
import { palette } from '@/constants/Colors';

const TwentyTwo = () => {
  const [splitted, setSplitted] = useState(false);

  return (
    <View style={styles.container}>
      <SplitButton
        splitted={splitted}
        mainAction={{
          label: 'Stop',
          backgroundColor: palette.card,
          onPress: () => {
            setSplitted(true);
          }
        }}
        leftAction={{
          label: 'Resume',
          backgroundColor: palette.card,
          onPress: () => {
            setSplitted(false);
          }
        }}
        rightAction={{
          label: 'Finish',
          backgroundColor: palette.highlight,
          onPress: () => {}
        }}
      />
    </View>
  );
};

export default TwentyTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColor1,
    justifyContent: 'center'
  }
});
