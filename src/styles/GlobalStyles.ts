import { StyleSheet } from 'react-native';

import { COLORS } from '../theme/Colors';

export const gloablStyles = StyleSheet.create({
  defaultBackgroundColor: {
    backgroundColor: COLORS.WHITE,
  },
  screenPaddingHorizontal: {
    paddingHorizontal: 20,
  },
  flexOne: {
    flex: 1,
  },
  cardShadow: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
});
