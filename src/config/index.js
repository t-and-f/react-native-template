import Config from 'react-native-config';

const config = {
  api: {
    host: Config.API_HOST,
    timeout: 10000,
  },
  isProduction: Config.IS_PRODUCTION,
};

export default config;
