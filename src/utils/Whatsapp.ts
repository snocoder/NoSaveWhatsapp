import { Alert, Linking } from 'react-native';

const openURL = async (url: string): Promise<void> => {
  try {
    await Linking.openURL(url);
  } catch (err: any) {
    Alert.alert(err?.message);
  }
};

export { openURL };
