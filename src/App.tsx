import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigation } from './navigation/BottomTabsNavigation';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigation />
    </NavigationContainer>
  );
};
