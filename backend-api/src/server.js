
const fs = require('fs');
const path = require('path');
const googleConfig = require('./config/google.config.json');
const config = require('./config/config.json');
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const jwt = require('./auth/jwt');

const app = express();


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jwt.jwt());


app.use(function catchAuthErrors(err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send({ success: false, data: 'Missing authentication credentials.'});
	}else{
    res.status(404).send({ success: false, data: 'Resource not found.'});
  }
});

fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
  require('./routes/' + file)(app);
});

const server = app.listen(config.port, () => {
    console.log(`Server is listening on http://localhost:${server.address().port}`);
  });
