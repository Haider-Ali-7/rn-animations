import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import Spacer from './Spacer';

export type ContactInfo = {
  name: string;
  email: string;
};

type ContactListItemProps = {
  contact?: ContactInfo;
};

const skeletonCommonProps = {
  colorMode: 'light',
  transition: {
    type: 'timing',
    duration: 2000
  },
  backgroundColor: '#d4d4d4'
} as const;

const ContactListItem: React.FC<ContactListItemProps> = ({ contact }) => {
  return (
    <View style={{ width: '100%', height: 120, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
      <Skeleton show={contact == null ? true : false} height={70} width={70} radius={'round'} {...skeletonCommonProps}>
        {contact && (
          <Animated.View
            layout={LinearTransition}
            entering={FadeIn.duration(1500)}
            style={{
              height: 70,
              aspectRatio: 1,
              backgroundColor: '#005CB7',
              borderRadius: 35,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {contact && <Text style={{ fontSize: 25, color: 'white' }}>{contact.name[0]}</Text>}
          </Animated.View>
        )}
      </Skeleton>
      <View style={{ marginLeft: 15, flexShrink: 1 }}>
        <Skeleton
          show={contact == null ? true : false}
          height={30}
          width={'85%'}
          radius={'round'}
          {...skeletonCommonProps}>
          {contact && (
            <Animated.Text layout={LinearTransition} entering={FadeIn.duration(1500)} style={{ fontSize: 25 }}>
              {contact.name}
            </Animated.Text>
          )}
        </Skeleton>
        <Spacer height={5} />
        <Skeleton
          show={contact == null ? true : false}
          height={25}
          width={'100%'}
          radius={'round'}
          {...skeletonCommonProps}>
          {contact && (
            <Animated.Text layout={LinearTransition} entering={FadeIn.duration(1500)} style={{ fontSize: 20 }}>
              {contact.email}
            </Animated.Text>
          )}
        </Skeleton>
      </View>
    </View>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({});
