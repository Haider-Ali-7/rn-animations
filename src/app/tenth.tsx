import ListItem1 from '@/components/ListItem1';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo'
];

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const BG_COLOR = '#FAFBFF';

const Tenth = () => {
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks(prevTasks => prevTasks.filter(el => el.index != task.index));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tenth</Text>
      <ScrollView style={{ flex: 1 }}>
        {tasks.map(el => (
          <ListItem1 key={el.index} task={el} onDismiss={onDismiss} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tenth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingHorizontal: '5%'
  },
  title: {
    fontSize: 60,
    marginVertical: 20
  }
});
