var express  = require('express');
var app         = express();
var jwt    = require('jsonwebtoken'); 
var router   = express.Router();

var User   = require('../../models/user'); 
var config = require('../../config/config'); 


app.set('superSecret', config.secret);

router.authenticate = function(req, res) {
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        console.log('user', user);
        if (err) throw err;

        if (!user) {
            res.json({
                success: false, message: 'Autentykacja zakończona porazką. Nie znaleziono uzytkownika.'
            })
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Autentykacja zakończona porazką. Złe hasło.' })
            } else {
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 60*60*24 // 24h
                });

                res.json({
                    success: true,
                    message: 'Autentykacja zakończona sukcesem!',
                    token: token
                    });
            }
        }
    });
};

module.exports = router