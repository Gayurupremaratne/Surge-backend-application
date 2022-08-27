require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressip = require('express-ip');
var cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path')
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// view engine setups
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressip().getIpInfoMiddleware);
app.use(cors());

app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));

const routes = require('./routes');
const response = require('./helpers/response');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization');

    if (req.method == 'OPTIONS') { res.status(200).end(); } else { next(); }
});


app.use(routes);

app.use(function (req, res, next) {
    response.fail(req, res, response.messages.invalid_url);
    return;
});

app.listen(process.env.SURGE_APP_PORT, () => {
    console.log('Surge Web app listening on port', process.env.SURGE_APP_PORT)
});
