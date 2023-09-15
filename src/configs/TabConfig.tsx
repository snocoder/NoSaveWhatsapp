import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../theme/Colors';
import { CallLogStack, HomeStack } from '../navigation/StackNavigations';

export const tabsConfig = {
  HOME: {
    name: 'HomeStack',
    component: HomeStack,
    tabBarLabel: 'Home',
    tabBarIcon: (focused: boolean) => (
      <MaterialCommunityIcons
        name="home"
        size={20}
        color={focused ? COLORS.CORALRed : COLORS.MANATEE}
      />
    ),
  },
  CALL_LOG: {
    name: 'CallLogStack',
    component: CallLogStack,
    tabBarLabel: 'Call Log',
    tabBarIcon: (focused: boolean) => (
      <MaterialCommunityIcons
        name="phone-log"
        size={20}
        color={focused ? COLORS.CORALRed : COLORS.MANATEE}
      />
    ),
  },
};
