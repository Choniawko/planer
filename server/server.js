var express     = require('express');
var app         = express();
var expressWs = require('express-ws')(app);
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var path        = require ('path');

var ws = require('nodejs-websocket');
var server = ws.createServer(socketConnection).listen(3005);

var jwt    = require('jsonwebtoken'); 
var config = require('./config/config'); 
var User   = require('./models/user'); 


var router = express.Router();

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


 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// websocket

function socketConnection(conn) {
	console.log('New connection established.', new Date().toLocaleTimeString());
	
	conn.on('text', function (msg) {
		// simple object transformation (= add current time)
		var msgObj = JSON.parse(msg);
		msgObj.newDate = new Date().toLocaleTimeString();
		var newMsg = JSON.stringify(msgObj)
		
		// echo message including the new field to all connected clients
		server.connections.forEach(function (conn) {
			conn.sendText(newMsg);
		})
	})
	conn.on('close', function (code, reason) {		
		console.log('Connection closed.', new Date().toLocaleTimeString());
	});

}

 
app.use('/api/apidoc', express.static('apidoc'));


 /**
 * @api {post} /api/authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission none
 * 
 * @apiParam {String} name The User name.
 * @apiParam {String} password The User password.
 * 
 * @apiParamExample {json} Request Body Example:
 * {
 * "success": true,
 * "message": "Autentykacja zakończona sukcesem!",
 * "token": 
 *          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycy
 *          I6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsIm5hbW
 *          UiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsicGFzc3dvcmQ
 *          iOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJ
 *          yZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJf
 *          ZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJw
 *          YXNzd29yZCI6InRlc3QiLCJuYW1lIjoidXNlcjEiLCJfaWQiOiI1NzIzOWZhYWM1ZmZkNTI4MTJiNWIzMGUifSwiX3ByZXMiO
 *          nsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbF0sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbbnVsbF0sIiRfX29yaW
 *          dpbmFsX3JlbW92ZSI6W251bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdLCIkX19vcmlnaW5hbF92YWxpZ
 *          GF0ZSI6W10sIiRfX29yaWdpbmFsX3JlbW92ZSI6W119LCJpYXQiOjE0NzExOTg5NDAsImV4cCI6MTQ3MTI4NTM0MH0.2DWnOkS
 *          TALxjra0Pd8EC12X0fmZ8sFOTVGDhik3omMw"
 * }
 * 
 * 
 */
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
 * 
 * 
 * @apiParam {String} name The User name.
 * @apiParam {String} password The User password.
 * @apiParam {Boolean} admin The User admin permission. 
 * @apiParam {String} email The User email.
 * @apiParam {String} firstname The User firstname.
 * @apiParam {String} lastname The User lastname.
 * 
 * @apiParamExample {json} Request Body Example:
 * 
 * {
 *   'success': true,
 *   'message': "Uzytkownik zapisany."
 * }
 * 
 */
router.post('/user', userRouter.create);


/**
 * @api {get} /api/user/:id
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission none
 * 
 * 
 * @apiParam {Number} id The Users-ID.
 * 
 * @apiParamExample {json} Request Body Example:
 *     [{
 *       '_id'        : '57b08258ca0589bf0350cc18'
 *       'name'       : 'pawel',
 *       'password'   : 'test',
 *       'admin'      : true,
 *       'email'      : 'pawel.choniawko@gmail.com',
 *       'firstname', : 'Pawel',  
 *       'lastname'   : 'Choniawko', 
 *     }]
 *
 */
router.get('/user/:id', userRouter.userGetId);







app.use('/api', router);
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('start serwera http://localhost:' + port);