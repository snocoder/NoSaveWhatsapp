import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { gloablStyles } from '../../../styles/GlobalStyles';
import { COLORS } from '../../../theme/Colors';
import { COUNTRYPREFIXCONFIG } from '../../../configs/CountryPrefix';
import { debounce } from '../../../utils/Debounce';

type CountryData = {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
};

type ItemProps = {
  country: CountryData;
  index: number;
  onItemSelect: (dialCode: string) => void;
};

const Item: React.FC<ItemProps> = ({ country, index, onItemSelect }) => {
  return (
    <Pressable
      onPress={() => onItemSelect(country.dial_code)}
      style={[
        styles.item,
        index === COUNTRYPREFIXCONFIG.length - 1 ? styles.lastItem : {},
      ]}>
      <Text style={styles.item__text}>
        {country.flag} {'  '} ({country.dial_code}) {'  '} {country.name}
      </Text>
    </Pressable>
  );
};

type ModalSelectorSearchableProps = {
  onCloseClick: () => void;
  visible: boolean;
  onItemSelect: (dialCode: string) => void;
};

export const ModalSelectorSearchable: React.FC<
  ModalSelectorSearchableProps
> = ({ onCloseClick, visible, onItemSelect }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<CountryData[]>(COUNTRYPREFIXCONFIG);

  useEffect(() => {
    filterData(search);
  }, [search]);

  const filterData = debounce((searchValue: string) => {
    if (search === '') {
      setData(COUNTRYPREFIXCONFIG);
    } else {
      setData(
        COUNTRYPREFIXCONFIG.filter(item =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }
  }, 100);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={[gloablStyles.flexOne, styles.modal]}>
        <View style={styles.modal__card}>
          <Pressable
            onPress={() => {
              onCloseClick();
            }}
            style={styles.modal__card__close}>
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={COLORS.TEXT}
            />
          </Pressable>
          <View style={styles.modal__card__list}>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <Item
                  country={item}
                  index={index}
                  onItemSelect={onItemSelect}
                />
              )}
              keyExtractor={item => item.code}
            />
          </View>
          <View style={styles.modal_inputContainer}>
            <TextInput
              style={styles.modal_inputContainer__input}
              value={search}
              onChangeText={setSearch}
              placeholder="Search country name..."
              placeholderTextColor={COLORS.MANATEE}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal__card: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  modal__card__close: {
    alignItems: 'flex-end',
  },
  modal__card__list: {
    maxHeight: 220,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
    borderRadius: 5,
    marginTop: 10,
  },
  modal_inputContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.CHARCOL,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 1,
  },
  modal_inputContainer__input: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  item: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  item__text: {
    color: COLORS.TEXT,
  },
});
