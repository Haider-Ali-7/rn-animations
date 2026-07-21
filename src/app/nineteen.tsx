import ContactListItem, { ContactInfo } from '@/components/contact-list-item';
import { LegendList } from '@legendapp/list';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Nineteen = () => {
  const [contacts, setContacts] = useState<ContactInfo[] | undefined>(undefined);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setTimeout(() => {
        setContacts(data);
      }, 5000);
    } catch (e) {
      console.log('fetchUsers error', e);
    }
  };

  return (
    <View style={styles.container}>
      <LegendList
        keyExtractor={(_, index) => index.toString()}
        data={contacts ?? Array(6).fill(undefined)}
        estimatedItemSize={120}
        ItemSeparatorComponent={() => <View style={styles.legendListContent} />}
        renderItem={({ item }) => <ContactListItem contact={item} />}
      />
    </View>
  );
};

export default Nineteen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  legendListContent: {
    height: 1,
    width: '100%',
    backgroundColor: '#ced0ce'
  }
});
