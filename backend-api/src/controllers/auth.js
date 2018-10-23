const jwt = require('../auth/jwt');
const googleAuth = require('../auth/google-auth');
const InMemoryUserStore = require('../in-memory-user-store')

const userStore = new InMemoryUserStore();


const createToken = user => {
    return jwt.generateToken(user);
  };
  
const getUser = login => {
    const type = login.type;
    switch (type) {
      case 'google':
        return googleAuth
          .getGoogleUser(login.code)
          .then(response => {
            const content = {
              token: createToken(response),
              user: response
            };
            return content;
          })
          .catch(e => {
            console.log(e);
            throw new Error(e);
          });
        break;
      default:
        throw new Error('unknow token type [' + type + ']');
    }
  };

const authenticate = login => {
    return getUser(login).then(principal => {
      return principal;
    });
  };

const login = async (req, res) => {
    try {
        const login = req.body;
        authenticate(login).then(credentials => {
        userStore.push(credentials.user);
        res.json({ success: true, data: credentials }).end();
      });
    } catch (error) {
        res.status(401).json({ success: false, error: 'invalid_social_login_token' }).end();
    } finally {
    }
};

module.exports.login = login;