import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { tabsConfig } from '../configs/TabConfig';
import { COLORS } from '../theme/Colors';
import { FONTS } from '../theme/Fonts';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: COLORS.CORALRed,
        tabBarInactiveTintColor: COLORS.MANATEE,
        tabBarLabelStyle: {
          fontFamily: FONTS.semiBoldFont,
        },
      }}>
      <Tab.Screen
        name={tabsConfig.HOME.name}
        component={tabsConfig.HOME.component}
        options={{
          tabBarLabel: tabsConfig.HOME.tabBarLabel,
          tabBarIcon: ({ focused }) => tabsConfig.HOME.tabBarIcon(focused),
        }}
      />
      <Tab.Screen
        name={tabsConfig.CALL_LOG.name}
        component={tabsConfig.CALL_LOG.component}
        options={{
          tabBarLabel: tabsConfig.CALL_LOG.tabBarLabel,
          tabBarIcon: ({ focused }) => tabsConfig.CALL_LOG.tabBarIcon(focused),
        }}
      />
    </Tab.Navigator>
  );
};
