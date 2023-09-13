import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <View>
        <Text>App text</Text>
      </View>
    </NavigationContainer>
  );
};
