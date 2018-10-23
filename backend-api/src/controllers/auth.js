const Authentication = require('../auth');
const auth = new Authentication();
const InMemoryUserStore = require('../in-memory-user-store')

const userStore = new InMemoryUserStore();


exports.login = async (req, res) => {
    try {
        const login = req.body;
        auth.authenticate(login).then(credentials => {
        userStore.push(credentials.user);
        res.json({ success: true, data: credentials }).end();
      });
    } catch (error) {
        res.status(401).json({ success: false, error: 'invalid_social_login_token' }).end();
    } finally {
    }
};