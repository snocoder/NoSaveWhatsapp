import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchCallLogs } from '../utils/CallLog';
import { gloablStyles } from '../styles/GlobalStyles';
import { COLORS } from '../theme/Colors';
import { FONTS } from '../theme/Fonts';
import { openURL } from '../utils/Whatsapp';

const CALLTYPES = {
  INCOMING: {
    name: 'Incoming',
    color: '#007AFF', // Blue
  },
  OUTGOING: {
    name: 'Outgoing',
    color: '#4CD964', // Green
  },
  MISSED: {
    name: 'Missed Call',
    color: '#FF3B30', // Red
  },
  VOICEMAIL: {
    name: 'Voicemail',
    color: '#5856D6', // Purple
  },
  REJECTED: {
    name: 'Rejected',
    color: '#FF9500', // Orange
  },
  BLOCKED: {
    name: 'Blocked',
    color: '#8E8E93', // Gray
  },
  UNKNOWN: {
    name: 'Unknown',
    color: '#999999', // Black (default color for unknown)
  },
};

type CallLogEntry = {
  dateTime: string;
  duration: number;
  name: string;
  phoneNumber: string;
  rawType: number;
  timestamp: string;
  type:
    | 'INCOMING'
    | 'OUTGOING'
    | 'MISSED'
    | 'VOICEMAIL'
    | 'REJECTED'
    | 'BLOCKED';
};

type ItemProps = {
  call: CallLogEntry;
  index: number;
  total: number;
};

const Item: React.FC<ItemProps> = ({ call, index, total }) => {
  return (
    <View style={[styles.item, index === total - 1 ? styles.lastItem : {}]}>
      <View style={[styles.item__phoneWhatsapp]}>
        <Text style={[styles.item__phoneWhatsapp__phoneText]}>
          {call.phoneNumber}
        </Text>
        <Pressable
          style={styles.item__phoneWhatsapp__whatsapp}
          onPress={() => {
            openURL(`whatsapp://send?phone=${call.phoneNumber}`);
          }}>
          <MaterialCommunityIcons name="whatsapp" size={24} color={'#25D366'} />
        </Pressable>
      </View>
      <View style={[styles.item__typeTime]}>
        <Text
          style={[
            styles.item__typeTime__type,
            { color: CALLTYPES[call.type].color },
          ]}>
          {CALLTYPES[call.type].name}
        </Text>
        <Text style={styles.item__typeTime__date}>{call.dateTime}</Text>
      </View>
    </View>
  );
};

export const CallLogScreen: React.FC = () => {
  const [limit, setLimit] = useState<number>(10);
  const [haveCallLogPermission, setHaveCallLogPermission] =
    useState<boolean>(false);
  const [callLogs, setCallLogs] = useState<CallLogEntry[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    checkForCallLogPermission();
  }, []);

  useEffect(() => {
    if (haveCallLogPermission) {
      handleFetchCallLogs();
    }
  }, [limit, haveCallLogPermission]);

  const handleEndReached = () => {
    setLimit(prevLimit => prevLimit + 10);
  };

  const handleFetchCallLogs = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchCallLogs(limit);
      if (!data.error) {
        setCallLogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching call logs:', error);
    }
    setIsRefreshing(false);
  };

  const checkForCallLogPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Permission',
          message: 'Access your call logs, to be able to send WhatsApp',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission Granted');
        setHaveCallLogPermission(true);
      } else {
        console.log('Call Log permission denied');
      }
    } catch (error) {
      console.error('Error checking for call log permission:', error);
    }
  };

  console.log('ran call log');

  return (
    <View
      style={[
        gloablStyles.defaultBackgroundColor,
        gloablStyles.screenPaddingHorizontal,
        gloablStyles.flexOne,
        styles.container,
      ]}>
      <FlatList
        data={callLogs}
        renderItem={({ item, index }) => (
          <Item call={item} index={index} total={callLogs.length} />
        )}
        keyExtractor={call => call.timestamp}
        onEndReachedThreshold={2}
        onEndReached={handleEndReached}
        refreshing={isRefreshing}
        onRefresh={() => {
          setLimit(10);
          handleFetchCallLogs();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  item: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  item__phoneWhatsapp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item__phoneWhatsapp__whatsapp: {
    paddingLeft: 15,
  },
  item__phoneWhatsapp__phoneText: {
    fontFamily: FONTS.semiBoldFont,
    color: COLORS.TEXT,
    fontSize: 16,
  },
  item__typeTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  item__typeTime__type: {
    color: COLORS.MANATEE,
    fontFamily: FONTS.regularFont,
    fontSize: 12,
  },
  item__typeTime__date: {
    color: COLORS.MANATEE,
    fontFamily: FONTS.regularFont,
    fontSize: 12,
  },
});
