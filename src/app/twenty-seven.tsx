import WeeklyBarChart from '@/components/WeeklyBarChart';
import { BACKGROUND_COLOR, data } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const TwentySeven = () => {
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <WeeklyBarChart weeks={data} activeWeekIndex={activeWeekIndex} onWeekChange={setActiveWeekIndex} />
    </View>
  );
};

export default TwentySeven;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
