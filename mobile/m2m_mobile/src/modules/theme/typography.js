import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const fontWeight = {
  regular: {
    fontFamily: 'Metropolis-Regular',
    fontWeight: '400',
  },
  bold: {
    fontFamily: 'Metropolis-Bold',
    fontWeight: '700',
  },
  extraBold: {
    fontFamily: 'Metropolis-ExtraBold',
    fontWeight: '800',
  },
  medium: {
    fontFamily: 'Metropolis-Medium',
    fontWeight: '500',
  },
};

export const textStyles = StyleSheet.create({
  h1: {
    ...fontWeight.extraBold,
    fontSize: 24,
    color: colors.black,
    lineHeight: 28,
  },
  h2: {
    ...fontWeight.bold,
    fontSize: 20,
    color: colors.black,
    lineHeight: 24,
    letterSpacing: 0.0,
  },
  h3: {
    ...fontWeight.regular,
    fontSize: 12,
    color: colors.white,
    lineHeight: 12,
    letterSpacing: 1,
  },
  'h3-strong': {
    ...fontWeight.bold,
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 15,
    letterSpacing: 0.8,
  },
  'h3-strong-indication': {
    ...fontWeight.bold,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 14,
  },
  h4: {
    ...fontWeight.regular,
    fontSize: 20,
    color: colors.textH4,
    lineHeight: 26,
  },
  todo: {
    ...fontWeight.bold,
    fontSize: 22,
    color: colors.textPrimary,
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  screen: {
    ...fontWeight.bold,
    fontSize: 14,
    color: colors.title,
    lineHeight: 16,
  },
  body: {
    ...fontWeight.regular,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  button: {
    ...fontWeight.bold,
    fontSize: 12,
    color: colors.black,
    lineHeight: 13,
    letterSpacing: 2,
  },
  date: {
    ...fontWeight.medium,
    fontSize: 12,
    color: colors.gray,
    alignSelf: 'center',
    lineHeight: 15,
    letterSpacing: 0.8,
  },
  notification: {
    ...fontWeight.bold,
    fontSize: 8,
    color: colors.white,
    lineHeight: 8,
  },
  sensorName: {
    ...fontWeight.medium,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  regular: fontWeight.regular,
  medium: fontWeight.medium,
  bold: fontWeight.bold,
  extraBold: fontWeight.bold,
});
