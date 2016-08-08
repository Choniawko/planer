var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');


var jwt    = require('jsonwebtoken'); 
var config = require('./config/config'); 
var User   = require('./models/user'); 


var userRouter = require('./routes/user/user');
var authRouter = require('./routes/auth/auth');
  
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
app.set('superSecret', config.secret);


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
 var router = express.Router();

 router.post('/authenticate', authRouter.authenticate);

 // metoda posrednicząca do weryfikcji tokena
//  router.use(function(req, res, next) {
//      console.log('req', req.headers['x-access-token']);
//      var token = req.body.token || req.query.token || req.headers['x-access-token'];

//      if (token) {
//          jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//              if (err) {
//                  return res.json({ success: false, message: 'Nieprawidłowy token' })
//              } else {
//                  req.decoded = decoded;
//                  next();
//              }
//          });
//      } else {
//          return res.status(403).send({ 
//         success: false, 
//         message: 'Nie przesłano tokena.' 
//     });
//      }
//  });

router.get('/users', userRouter.list);
router.post('/user', userRouter.create);




app.use('/api', router);
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('start serwera http://localhost:' + port);