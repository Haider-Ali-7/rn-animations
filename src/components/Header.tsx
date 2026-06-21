import React, { useCallback, useRef, useState } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { moderateScale, verticalScale } from '@/utils/scaling-utils';
import TextInput from './TextInput';
import Text from './Text';

interface HeaderProps {
  title?: string;
  isSearch?: boolean;
  isSettings?: boolean;
  isNotifications?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, isSearch, isSettings, isNotifications }) => {
  const { theme } = useUnistyles();
  const inputRef = useRef<RNTextInput>(null);
  const [search, setSearch] = useState('');
  const [close, setClose] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      let timeout: ReturnType<typeof setTimeout>;

      if (isSearch) {
        timeout = setTimeout(() => inputRef.current?.focus(), 150);
      }

      return () => {
        setClose(false);
        clearTimeout(timeout);
      };
    }, [isSearch])
  );

  const handleNav = useCallback((type: 'back' | 'settings') => {
    if (type === 'settings') {
      router.replace('/settings');
    } else {
      router.back();
    }
  }, []);

  const handleEnableSearch = useCallback(() => {
    setClose(false);
    inputRef.current?.focus();
  }, []);

  const handleClose = useCallback(() => {
    setSearch('');
    setClose(true);
    inputRef.current?.blur();
  }, []);

  return (
    <View style={styles.container}>
      <MaterialIcons
        style={styles.icon}
        onPress={() => handleNav('back')}
        name="arrow-back"
        size={moderateScale(24)}
        color={theme.colors.white}
      />

      {isSettings || isNotifications || close ? <Text textStyle={styles.title}>{title}</Text> : null}

      {isNotifications ? (
        <MaterialIcons
          style={styles.icon}
          onPress={() => handleNav('settings')}
          name="settings"
          size={moderateScale(24)}
          color={theme.colors.white}
        />
      ) : isSearch ? (
        <>
          {close ? (
            <MaterialIcons
              style={styles.icon}
              onPress={handleEnableSearch}
              name="search"
              size={moderateScale(24)}
              color={theme.colors.white}
            />
          ) : (
            <>
              <TextInput
                inputRef={inputRef}
                placeholder="Search"
                style={styles.input}
                value={search}
                onChangeText={setSearch}
                autoFocus={true}
              />
              <MaterialIcons
                style={styles.icon}
                onPress={handleClose}
                name="close"
                size={moderateScale(24)}
                color={theme.colors.white}
              />
            </>
          )}
        </>
      ) : null}
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.bg4,
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(40)
  },
  icon: {
    paddingHorizontal: moderateScale(16)
  },
  input: {
    flex: 1,
    color: theme.colors.text
  },
  title: {
    flex: 1,
    color: theme.colors.white,
    fontSize: moderateScale(16)
  }
}));
