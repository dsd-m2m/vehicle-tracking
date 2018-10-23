
const fs = require('fs');
const path = require('path');
const googleConfig = require('./config/google.config.json');
const config = require('./config/config.json');
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const Authentication = require('./auth');
const auth = new Authentication();


const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.filter());


app.get('/', function(req,res) {
    res.sendfile('static/index.html');
  });

fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
  require('./routes/' + file)(app);
});
  
app.use(function(req, res, next){
    res.status(404).json({ success: false, error: 'not_found' }).end();
});



const server = app.listen(config.port, () => {
    console.log(`Server is listening on http://localhost:${server.address().port}`);
  });
