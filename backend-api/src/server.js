/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable array-callback-return */
require('dotenv').config('');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const dynamo = require('dynamodb');
const jwt = require('./auth/jwt');
const config = require('./config');

const swaggerDocument = YAML.load('./public/swagger.yaml');

dynamo.AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(jwt.jwt());

fs.readdirSync(path.join(__dirname, 'routes')).map((file) => {
  require(`./routes/${file}`)(app, '/api');
});

app.use((req, res) => res.status(404).send({ success: false, data: 'Resource not found' }));
app.use((err, req, res) => {
  console.log('ERROR:', err.message);
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ success: false, data: 'Missing authentication credentials' });
  } else {
    res.status(500).send({ success: false, data: err.message });
  }
});

const server = app.listen(config.server.port, () => {
  console.log(`Server is listening on http://localhost:${server.address().port}`);
});
