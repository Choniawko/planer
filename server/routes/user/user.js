var express     = require('express');
var app         = express();

var router   = express.Router();
var User   = require('../../models/user'); 
var bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.list = function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
};

router.create = function (req, res) {
    
    var user = new User(req.body);
    console.log('req.body', req.body, user);
    user.save(function(err) {
        if (err) throw err;

        res.json({
            success: true,
            message: "Uzytkownik zapisany."
        });
    });

}

router.userGetId = function(req, res) {
    console.log('req.params.id', req.params.id);
    User.find( {$or: [{ "_id" : req.params.id }, { "name" : req.params.id }]},  function(req, user) {
        res.json(user);
    })
} 



module.exports = router