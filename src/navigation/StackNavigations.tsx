import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { HomeScreen } from '../screens/Home.screen';
import { CallLogScreen } from '../screens/CallLog.screen';
import { COLORS } from '../theme/Colors';
// import { Button } from '../components/atoms/button/Button';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  headerTintColor: COLORS.WHITE,
  headerStyle: {
    backgroundColor: COLORS.CORALRed,
  },
  // headerRight: () => (
  //   <Button
  //     icon="whatsapp"
  //     text="Share"
  //     onPress={() => {
  //       // TODO: create a utility function to open share on whatsapp with default message
  //       console.log('logging');
  //     }}
  //   />
  // ),
  // headerRightContainerStyle: {
  //   paddingRight: 20,
  // },
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerTitle: 'Home' }}
    />
  </Stack.Navigator>
);

const CallLogStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="CallLogScreen"
      component={CallLogScreen}
      options={{ headerTitle: 'Call Logs' }}
    />
  </Stack.Navigator>
);

export { HomeStack, CallLogStack };
