import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { gloablStyles } from '../styles/GlobalStyles';
import { COLORS } from '../theme/Colors';
import { FONTS } from '../theme/Fonts';
import { Button } from '../components/atoms/button/Button';
import { ModalSelectorSearchable } from '../components/organisms/modalselectorsearchable/ModalSelectorSearchable';
import { openURL } from '../utils/Whatsapp';

export const HomeScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [dialCode, setDialCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendWhatsappClick = () => {
    if (dialCode === '') {
      setErrorMessage('Please select country code');
      return;
    }
    if (mobile === '') {
      setErrorMessage('Please enter mobile number');
      return;
    }
    setErrorMessage('');
    const url = `whatsapp://send?text=${message}&phone=${dialCode}${mobile};`;
    openURL(url);
  };

  return (
    <SafeAreaView
      style={[
        gloablStyles.defaultBackgroundColor,
        gloablStyles.screenPaddingHorizontal,
        gloablStyles.flexOne,
        styles.container,
      ]}>
      <View style={[gloablStyles.cardShadow, styles.card]}>
        <View style={[styles.card__header]}>
          <Text style={[styles.card__header__title]}>Whatsapp to anyone</Text>
          <Text style={[styles.card__header__subtitle]}>
            Without Saving their number
          </Text>
        </View>
        <View style={[styles.card__inputsWrapper]}>
          <View style={[styles.card__inputsWrapper__inputs]}>
            <Pressable
              onPress={() => {
                setShowModal(true);
              }}
              style={[
                styles.inputBorder,
                styles.card__inputsWrapper__inputs__prefix,
              ]}>
              <Text style={[styles.card__inputsWrapper__inputs__prefix__text]}>
                {dialCode}
              </Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={COLORS.TEXT}
              />
            </Pressable>
            <View
              style={[
                styles.inputBorder,
                styles.card__inputsWrapper__inputs__inputContainer,
              ]}>
              <TextInput
                style={
                  styles.card__inputsWrapper__inputs__inputContainer__input
                }
                value={mobile}
                onChangeText={setMobile}
                keyboardType="numeric"
                placeholder="Enter mobile number"
                placeholderTextColor={COLORS.MANATEE}
              />
            </View>
          </View>
          <View
            style={[
              styles.inputBorder,
              styles.card__inputsWrapper__textAreaInput,
            ]}>
            <TextInput
              style={[styles.card__inputsWrapper__textAreaInput__input]}
              value={message}
              onChangeText={setMessage}
              multiline={true}
              numberOfLines={4}
              placeholder="Type message here (optional)"
              placeholderTextColor={COLORS.MANATEE}
            />
          </View>
          {errorMessage && (
            <View style={[styles.card__inputsWrapper__error]}>
              <Text style={[styles.card__inputsWrapper__error__text]}>
                {errorMessage}
              </Text>
            </View>
          )}
        </View>
        <View>
          <Button
            icon="whatsapp"
            iconSize={22}
            iconColor={COLORS.WHITE}
            text="Send Whatsapp"
            onPress={handleSendWhatsappClick}
            buttonStyle={styles.whatsappButton}
            textStyle={styles.whatsappButton__textStyle}
          />
        </View>
      </View>

      {showModal && (
        <ModalSelectorSearchable
          visible={showModal}
          onCloseClick={() => {
            setShowModal(false);
          }}
          onItemSelect={(selectedDialCode: string) => {
            setDialCode(selectedDialCode);
            setShowModal(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
  },
  card__header: {
    alignItems: 'center',
  },
  card__header__title: {
    fontSize: 24,
    color: COLORS.CORALRed,
    fontFamily: FONTS.mediumFont,
  },
  card__header__subtitle: {
    fontSize: 20,
    fontFamily: FONTS.regularFont,
    color: COLORS.TEXT,
    marginTop: -5,
  },
  card__inputsWrapper: {
    marginTop: 20,
  },
  card__inputsWrapper__inputs: {
    flexDirection: 'row',
  },
  card__inputsWrapper__textAreaInput: {
    marginTop: 10,
  },
  card__inputsWrapper__textAreaInput__input: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  card__inputsWrapper__error: {
    marginTop: 10,
  },
  card__inputsWrapper__error__text: {
    color: COLORS.ERROR,
    textAlign: 'center',
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: COLORS.CHARCOL,
    borderRadius: 5,
  },
  card__inputsWrapper__inputs__prefix: {
    flex: 0,
    marginRight: 15,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  card__inputsWrapper__inputs__prefix__text: {
    color: COLORS.TEXT,
    fontSize: 16,
  },
  card__inputsWrapper__inputs__inputContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 1,
  },
  card__inputsWrapper__inputs__inputContainer__input: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    marginTop: 10,
  },
  whatsappButton__textStyle: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
});
