import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../../theme/Colors';
import { FONTS } from '../../../theme/Fonts';

type ButtonProps = {
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  text: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonContentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const Button: React.FC<ButtonProps> = ({
  icon,
  iconSize,
  iconColor,
  text,
  onPress,
  buttonStyle,
  buttonContentStyle,
  textStyle,
}) => {
  return (
    <Pressable onPress={onPress} style={[style.button, buttonStyle]}>
      <View style={[style.buttonContent, buttonContentStyle]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={iconSize || 20}
            color={iconColor || COLORS.CORALRed}
          />
        )}
        <Text style={[style.text, textStyle]}>{text.toUpperCase()}</Text>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontFamily: FONTS.semiBoldFont,
    color: COLORS.CORALRed,
    marginLeft: 5,
  },
});
