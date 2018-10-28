const config  = require('../config');
const { OAuth2Client } = require('google-auth-library');
var client = new OAuth2Client(config.auth.googleClientId, '', '');

module.exports.getGoogleUser = code => {
  return client
    .verifyIdToken({ idToken: code, audience: config.auth.googleClientId })
    .then(login => {
      var payload = login.getPayload();

      var audience = payload.aud;
      if (audience !== config.auth.googleClientId) {
        throw new Error(
          'error while authenticating google user: audience mismatch: wanted [' +
          config.auth.googleClientId +
            '] but was [' +
            audience +
            ']'
        );
      }
      return {
        name: payload['name'],
        pic: payload['picture'],
        id: payload['sub'],
        email_verified: payload['email_verified'],
        email: payload['email']
      };
    })
    .then(user => {
      return user;
    })
    .catch(err => {
      throw new Error(
        'error while authenticating google user: ' + JSON.stringify(err)
      );
    });
};