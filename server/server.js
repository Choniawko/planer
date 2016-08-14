var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var path        = require ('path');


var jwt    = require('jsonwebtoken'); 
var config = require('./config/config'); 
var User   = require('./models/user'); 


var userRouter = require('./routes/user/user');
var authRouter = require('./routes/auth/auth');
  
// =======================
// konfiguracja  =========
// =======================

var port = process.env.PORT || 3000;

mongoose.connect(config.database, function(err, db) {
    if (err) {
        console.log('err', err);
    } else {
        console.log("Połaczono z bazą");
    }
});
app.set('superSecret', config.secret);

app.use(express.static(path.join(__dirname, 'doc')));
console.log("__dirname", __dirname);
app.set('views', './doc');
app.set('view engine', 'ejs');




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

 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


 
app.use('/api/apidoc', express.static('apidoc'));


 
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

/**
 * @api {get} /api/users
 * @apiName GetUsers
 * @apiGroup User
 * @apiPermission none
 */
router.get('/users', userRouter.list);

/**
 * @api {post} /api/user
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 */
router.post('/user', userRouter.create);
/**
 * @api {post} /api/user/:id
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 * 
 * @apiParam {Number} id The Users-ID.
 * 
 * @apiExample Example usage:
 * curl -i http://localhost:3000/api/user/4
 * 
 * @apiSuccess {Number}   _id            The Users-ID.
 * @apiSuccess {String}   name            The Users-username.
 * @apiSuccess {String}   password            The Users-password.
 * @apiSuccess {Boolean}   admin            The Users-permission admin.
 * @apiSuccess {String}   email            The Users-email.
 * @apiSuccess {String}   firstname            The Users-firstname.
 * @apiSuccess {String}   lastname            The Users-lastname.
 */
router.get('/user/:id', userRouter.userGetId);





app.use('/api', router);
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('start serwera http://localhost:' + port);