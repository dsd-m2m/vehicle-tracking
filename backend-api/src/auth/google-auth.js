/* eslint-disable prefer-destructuring */
const { OAuth2Client } = require('google-auth-library');
const config = require('../config');

const client = new OAuth2Client(config.auth.googleClientId, '', '');

module.exports.getGoogleUser = (socialToken, isMobile) => {
  let googleClientId = config.auth.googleClientId;
  if (isMobile) {
    googleClientId = config.auth.googleClientIdMobile;
  }
  return client
    .verifyIdToken({ idToken: socialToken, audience: googleClientId })
    .then((login) => {
      const payload = login.getPayload();

      const audience = payload.aud;
      if (audience !== googleClientId) {
        throw new Error(login);
      }
      return {
        name: payload.name,
        pic: payload.picture,
        id: payload.sub,
        email_verified: payload.email_verified,
        email: payload.email,
      };
    });
};

