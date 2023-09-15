import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { gloablStyles } from '../styles/GlobalStyles';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView
      style={[gloablStyles.defaultBackgroundColor, gloablStyles.flexOne]}>
      <Text>Home2 screen</Text>
    </SafeAreaView>
  );
};
