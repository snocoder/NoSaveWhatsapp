import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';

import { BottomTabsNavigation } from './navigation/BottomTabsNavigation';

export const App: React.FC = () => {
  useEffect(() => {
    // if (Platform.OS === 'android') {
    SplashScreen.hide();
    // }
  }, []);

  return (
    <NavigationContainer>
      <BottomTabsNavigation />
    </NavigationContainer>
  );
};
