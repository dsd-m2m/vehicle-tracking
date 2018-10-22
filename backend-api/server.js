const googleConfig = require('./google.config.json')
const config = require('./config');
const routesConfig = require('./routes.config');
const Authentication = require('./auth');
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const auth = new Authentication({ routes: routesConfig });
const InMemoryUserStore = require('./in-memory-user-store')

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.filter());
app.use(express.static('static'));

const userStore = new InMemoryUserStore();

const handleTokenRequest = (req, res) => {
    try {
        const login = req.body;
        auth.authenticate(login).then(credentials => {
        userStore.push(credentials.user);
        res.json(credentials).end();
      });
    } catch (error) {
        res.status(401).json({ success: false, error: 'invalid_social_login_token' }).end();
    } finally {
    }
  };

app.get('/ping', (req, res) => res.json({ success: true, message: 'from server /ping' }));
app.get('/api/ping', (req, res) => res.json({ success: true, message: 'from server /api/ping' }));
app.get('/', function(req,res) {
    res.sendfile('static/index.html');
  });
app.post('/auth/token', handleTokenRequest);

app.use(function(req, res, next){
    res.status(404).json({ success: false, error: 'not_found' }).end();
});
const server = app.listen(config.port, () => {
    console.log(`Server is listening on http://localhost:${server.address().port}`);
  });
