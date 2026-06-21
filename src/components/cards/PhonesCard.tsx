import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { moderateScale, verticalScale } from '@/utils/scaling-utils';
import Text from '../Text';
import Spacer from '../Spacer';
import Divider from '../Divider';

type PhonesCardProps = {
  item: any;
  vertical?: boolean;
  onPress: () => void;
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const PhonesCard = ({ item, vertical, onPress }: PhonesCardProps) => {
  return (
    <>
      {/* <Spacer height={verticalScale(12)} /> */}

      {vertical ? (
        <TouchableOpacity style={styles.card} onPress={onPress}>
          <Image
            style={styles.img}
            source={require('@/assets/images/s21-ultra-5g.jpg')}
            // placeholder={{ blurhash }}
            resizeMode="contain"
            // transition={1000}
          />
          <Spacer height={verticalScale(8)} />
          <Text font="p12" weight="InterBold" textStyle={styles.desc}>
            Samsung Galaxy S21 Ultra 5G
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.card1} onPress={onPress}>
            <Image
              style={styles.img1}
              source={require('@/assets/images/s21-ultra-5g.jpg')}
              // placeholder={{ blurhash }}
              resizeMode="contain"
              // transition={1000}
            />
            <Spacer width={moderateScale(6)} />
            <View style={{ flexShrink: 1 }}>
              <Text font="p12" weight="InterBold" textStyle={styles.desc}>
                Samsung Galaxy S21 Ultra 5G
              </Text>
            </View>
          </TouchableOpacity>
          <Divider />
        </>
      )}
    </>
  );
};

export default React.memo(PhonesCard);

const styles = StyleSheet.create(theme => ({
  card: {
    width: '100%',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    alignItems: 'center'
  },
  img: {
    width: '100%',
    height: verticalScale(120),
    borderRadius: moderateScale(12)
  },
  desc: {
    flexShrink: 1,
    textAlign: 'center',
    color: theme.colors.text
  },
  time: {
    color: theme.colors.textSecondary
  },
  card1: {
    flexDirection: 'row',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    alignItems: 'center'
  },
  img1: {
    width: '27%',
    height: verticalScale(90),
    borderRadius: moderateScale(12)
  }
}));
