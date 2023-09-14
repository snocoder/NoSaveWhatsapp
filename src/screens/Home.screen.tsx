import React from 'react';
import { Text, View } from 'react-native';

import { gloablStyles } from '../styles/GlobalStyles';

export const HomeScreen: React.FC = () => {
  return (
    <View>
      <Text style={[gloablStyles.extraBoldFont]}>Home2 screen</Text>
    </View>
  );
};
