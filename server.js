const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const config = require('./config/mongo_config');
const bodyParser = require('body-parser');

//import route files
const user_routes = require('./routes/user_routes');
const survey_routes = require('./routes/survey_routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

mongoose.connect(config.dburl_env, { useNewUrlParser: true });
var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dburl_env))
    .on('error', (error) => {
        console.warn('Warning', error.toString())
    });

//activate routes
user_routes(app);
survey_routes(app);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running on port' + port));
