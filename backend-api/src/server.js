require('dotenv').config('.env');
process.env.NODE_ENV = 'test';

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const jwt = require('./auth/jwt');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../public/swagger.json');

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(jwt.jwt());

app.use(function catchAuthErrors(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ success: false, data: 'Missing authentication credentials.' });
  } else {
    res.status(404).send({ success: false, data: 'Resource not found.' });
  }
});

fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
  require('./routes/' + file)(app, '/api');
});

const server = app.listen(config.server.port, () => {
  console.log(`Server is listening on http://localhost:${server.address().port}`);
});


const User = require('./models/user').user;
