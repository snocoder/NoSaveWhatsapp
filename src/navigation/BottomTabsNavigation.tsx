import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HomeScreen } from '../screens/Home.screen';
import { CallLogScreen } from '../screens/CallLog.screen';
import { gloablStyles } from '../styles/GlobalStyles';
import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();

const tabsConfig = {
  HOME: {
    name: 'HomeScreen',
    component: HomeScreen,
    tabBarLabel: 'Home',
    tabBarIcon: (focused: boolean) => (
      <MaterialCommunityIcons
        name="home"
        size={20}
        color={focused ? COLORS.coralRed : COLORS.manatee}
      />
    ),
  },
  CALL_LOG: {
    name: 'CallLogScreen',
    component: CallLogScreen,
    tabBarLabel: 'Call Log',
    tabBarIcon: (focused: boolean) => (
      <MaterialCommunityIcons
        name="phone-log"
        size={20}
        color={focused ? COLORS.coralRed : COLORS.manatee}
      />
    ),
  },
};

export const BottomTabsNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: COLORS.coralRed,
        tabBarInactiveTintColor: COLORS.manatee,
        tabBarLabelStyle: gloablStyles.semiBoldFont,
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
