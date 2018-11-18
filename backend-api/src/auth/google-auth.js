const { OAuth2Client } = require('google-auth-library');
const config = require('../config');

const client = new OAuth2Client(config.auth.googleClientId, '', '');

module.exports.getGoogleUser = socialToken => client
  .verifyIdToken({ idToken: socialToken, audience: config.auth.googleClientId })
  .then((login) => {
    const payload = login.getPayload();

    const audience = payload.aud;
    if (audience !== config.auth.googleClientId) {
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
