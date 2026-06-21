import React from 'react';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { moderateScale, verticalScale } from '@/utils/scaling-utils';
import Text from '../Text';
import Spacer from '../Spacer';

type NewsCardProps = {
  item: any;
  vertical?: boolean;
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const NewsCard = ({ item, vertical }: NewsCardProps) => {
  return (
    <>
      <Spacer height={verticalScale(12)} />

      {vertical ? (
        <View style={styles.card}>
          <Image
            style={styles.img}
            source={{ uri: 'https://picsum.photos/seed/696/3000/2000' }}
            // placeholder={{ blurhash }}
            resizeMode="cover"
            // transition={1000}
          />
          <Spacer height={verticalScale(8)} />
          <Text font="p14" weight="InterBold" textStyle={styles.desc}>
            {item?.title}
          </Text>
          <Spacer height={verticalScale(4)} />
          <Text font="p12" weight="InterRegular" textStyle={styles.time}>
            6 hours ago
          </Text>
        </View>
      ) : (
        <View style={styles.card1}>
          <Image
            style={styles.img1}
            source={{ uri: 'https://picsum.photos/seed/696/3000/2000' }}
            // placeholder={{ blurhash }}
            resizeMode="cover"
            // transition={1000}
          />
          <Spacer width={moderateScale(6)} />
          <View style={{ flexShrink: 1 }}>
            <Text font="p14" weight="InterBold" textStyle={styles.desc}>
              {item?.title}
            </Text>
            <Spacer height={verticalScale(4)} />
            <Text font="p12" weight="InterRegular" textStyle={styles.time}>
              6 hours ago
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default React.memo(NewsCard);

const styles = StyleSheet.create(theme => ({
  card: {
    width: '94%',
    height: verticalScale(200),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(12),
    overflow: 'hidden'
  },
  img: {
    flex: 0.9,
    width: '100%',
    borderRadius: moderateScale(12),
    backgroundColor: '#0553'
  },
  desc: {
    flexShrink: 1,
    color: theme.colors.text
  },
  time: {
    color: theme.colors.textSecondary
  },
  card1: {
    width: '94%',
    flexDirection: 'row',
    height: verticalScale(110),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(12),
    overflow: 'hidden'
  },
  img1: {
    width: '49%',
    borderRadius: moderateScale(12),
    backgroundColor: '#0553'
  }
}));
