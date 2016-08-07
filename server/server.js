var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');


var jwt    = require('jsonwebtoken'); 
var config = require('./config/config'); 
var User   = require('./models/user'); 
  
// =======================
// konfiguracja  =========
// =======================

var port = process.env.PORT || 8080;
mongoose.connect(config.database, function(err, db) {
    if (err) {
        console.log('err', err);
    } else {
        console.log("Połaczono z bazą");
    }
});
app.set('secret', config.secret);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan('dev'));


// ========================
// sciezki ================
// ========================
// basic route

app.get('/', function(req, res) {
    res.send(' API  http://localhost:' + port + '/api');
});

// API ROUTES -------------------

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('start serwera http://localhost:' + port);