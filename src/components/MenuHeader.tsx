import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { MaterialIcons } from '@/constants/Icons';
import { router } from 'expo-router';

import { moderateScale, verticalScale } from '@/utils/scaling-utils';
import Text from './Text';

const MenuHeader: React.FC = () => {
  const nav = useNavigation();
  const { theme } = useUnistyles();

  const toggleMenu = useCallback(() => {
    nav.dispatch(DrawerActions.toggleDrawer());
  }, [nav]);

  const handleNav = useCallback((type: 'bell' | 'search' | 'profile') => {
    if (type === 'bell') {
      router.navigate('/(drawer)/notifications');
    } else if (type === 'search') {
      router.navigate('/(drawer)/search');
    } else if (type === 'profile') {
      router.navigate('/(drawer)/profile');
    }
  }, []);

  return (
    <View style={styles.container}>
      <MaterialIcons
        style={styles.icon}
        onPress={toggleMenu}
        name="menu"
        size={moderateScale(24)}
        color={theme.colors.white}
      />
      <Text weight="InterSemiBold" textStyle={styles.heading}>
        GSMARENA
      </Text>

      <MaterialIcons
        style={styles.iconMiddle}
        onPress={() => handleNav('bell')}
        name="notifications"
        size={moderateScale(24)}
        color={theme.colors.white}
      />
      <MaterialIcons
        style={styles.iconMiddle}
        onPress={() => handleNav('search')}
        name="search"
        size={moderateScale(24)}
        color={theme.colors.white}
      />
      <MaterialIcons
        style={styles.iconRight}
        onPress={() => handleNav('profile')}
        name="manage-accounts"
        size={moderateScale(24)}
        color={theme.colors.white}
      />
    </View>
  );
};

export default memo(MenuHeader);

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.bg4,
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(40)
  },
  heading: {
    flex: 1,
    letterSpacing: 6,
    color: theme.colors.white
  },
  icon: {
    paddingHorizontal: moderateScale(16)
  },
  iconMiddle: {
    paddingHorizontal: moderateScale(8)
  },
  iconRight: {
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(16)
  }
}));
