import { Linking } from 'react-native';

const openURL = async (url: string): Promise<void> => {
  await Linking.openURL(url);
};

export { openURL };
