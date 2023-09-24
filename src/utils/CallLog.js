import CallLogs from 'react-native-call-log';

const fetchCallLogs = async (limit = 10) => {
  try {
    const callLogs = await CallLogs.load(limit);
    console.log('callLogs', callLogs);
    return { data: callLogs, hasError: false, error: null };
  } catch (error) {
    console.error('Error fetching call logs:', error);
    return { data: null, hasError: true, error: error?.message };
  }
};

export { fetchCallLogs };
