import { format } from 'date-fns';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { W_WIDTH } from '@/utils/platforms-utils';
import SingleBar, { Day } from './single-bar';

type Week = Day[];

interface WeeklyBarChartProps {
  weeks: Week[];
  activeWeekIndex: number;
  onWeekChange: (index: number) => void;
}

const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({ weeks, activeWeekIndex, onWeekChange }) => {
  const activeWeek = weeks[activeWeekIndex];

  const BarChartWidth = W_WIDTH * 0.9;
  const BarChartGap = 10;
  const BarWidth = (BarChartWidth - BarChartGap * (activeWeek.length - 1)) / activeWeek.length;
  const MaxBarHeight = 150;
  const ScrollViewHeight = 60;

  return (
    <View style={{ height: MaxBarHeight + ScrollViewHeight, width: W_WIDTH }}>
      <View
        style={{
          flexDirection: 'row',
          gap: BarChartGap,
          height: MaxBarHeight,
          alignItems: 'flex-end',
          marginHorizontal: (W_WIDTH - BarChartWidth) / 2
        }}>
        {activeWeek.map((el, i) => (
          <SingleBar key={i} maxHeight={MaxBarHeight} width={BarWidth} day={el} />
        ))}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => {
          const scrollOffset = nativeEvent.contentOffset.x;
          onWeekChange(Math.round(scrollOffset / W_WIDTH));
        }}>
        {weeks.map((el, i) => (
          <View
            key={i}
            style={{
              height: ScrollViewHeight,
              width: W_WIDTH,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '400' }}>
              week of {format(el[0].day, 'dd MMM')}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default WeeklyBarChart;
