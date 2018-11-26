const defaultConfig = {
  server: {
    port: process.env.PORT || 8080,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  auth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientIdMobile: process.env.GOOGLE_CLIENT_ID_MOBILE,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleClientIdMobile: process.env.GOOGLE_CLIENT_ID_MOBILE,
  },
};

module.exports = defaultConfig;
