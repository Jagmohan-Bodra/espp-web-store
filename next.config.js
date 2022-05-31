require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_HOST,
    HOST_NAME: process.env.NEXT_PUBLIC_HOST_NAME,
    TENANT_ID: process.env.NEXT_PUBLIC_TENANT_ID,
    ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    RE_CAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_RE_CAPTCHA_SITEKEY,
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
};
