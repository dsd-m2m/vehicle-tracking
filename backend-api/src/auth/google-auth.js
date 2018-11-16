const config = require('../config');
const { OAuth2Client } = require('google-auth-library');
var client = new OAuth2Client(config.auth.googleClientId, '', '');

module.exports.getGoogleUser = socialToken => {
  return client
    .verifyIdToken({ idToken: socialToken, audience: config.auth.googleClientId })
    .then(login => {
      var payload = login.getPayload();

      var audience = payload.aud;
      if (audience !== config.auth.googleClientId) {
        throw new Error(login);
      }
      return {
        name: payload['name'],
        pic: payload['picture'],
        id: payload['sub'],
        email_verified: payload['email_verified'],
        email: payload['email']
      };
    });
};