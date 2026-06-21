import { StyleSheet } from 'react-native-unistyles';

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20
};

const borderRadius = {
  sm: 6,
  md: 12,
  lg: 20
};

const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20
};

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000
} as const;

export const darkTheme = {
  colors: {
    bg1: '#212121',
    bg2: '#3A4651',
    bg3: '#3F4D59',
    bg4: '#171717',

    border: '#757575',
    border_input: '#BDBDBD',

    btn: '#d50000',

    text: '#E0E0E0',
    textSecondary: '#888',
    textInverted: '#000',

    grey: '#a5a5a5',

    accent: '#444',
    activeTint: '#BA2C2C',
    inactiveTint: '#F5F5F5',

    white: '#fff',
    black: '#000',
    tp: 'transparent',
    verticalLine: 'rgba(255, 255, 255, 0.1)',

    // fourth
    bgColor: '#1E1E1E',
    circle: '#252525',
    text1: '#f8f8f8'
  },
  spacing,
  borderRadius,
  fontSize,
  gap: (v: number) => v * 8
};

export const lightTheme = {
  colors: {
    bg1: '#212121',
    bg2: '#3A4651',
    bg3: '#3F4D59',
    bg4: '#171717',

    border: '#757575',
    border_input: '#BDBDBD',

    btn: '#d50000',

    text: '#E0E0E0',
    textSecondary: '#888',
    textInverted: '#000',

    grey: '#a5a5a5',

    accent: '#444',
    activeTint: '#BA2C2C',
    inactiveTint: '#F5F5F5',

    white: '#fff',
    black: '#000',
    tp: 'transparent',
    verticalLine: 'rgba(255, 255, 255, 0.1)',

    // fourth
    bgColor: '#f8f8f8',
    circle: '#fff',
    text1: '#1E1E1E'
  },
  spacing,
  borderRadius,
  fontSize,
  gap: (v: number) => v * 8
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme
};

type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: { adaptiveThemes: true },
  breakpoints,
  themes: appThemes
});
