import { LegendList } from '@legendapp/list';
import { Href, router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import Heading from '@/components/Heading';
import ListItem from '@/components/ListItem';
import Spacer from '@/components/Spacer';
import { list } from '@/mocks/home-mocks';
import { verticalScale } from '@/utils/scaling-utils';

const Home = () => {
  const renderItem = ({ item }: any) => <ListItem item={item} onPress={() => handleNav(item?.nav)} />;

  const handleNav = (nav: Href) => {
    router.push(nav);
  };

  return (
    <View style={styles.container}>
      <Spacer height={verticalScale(10)} />
      <Heading title="React Native Animations" />
      <LegendList
        estimatedItemSize={40}
        data={list}
        keyExtractor={(_, ind) => ind.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg1
  }
}));
