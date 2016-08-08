var app  = require('express');
var router   = app.Router();
var User   = require('../../models/user'); 

router.list = function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
};

router.create = function (req, res) {
    
    console.log('req.body', req.body);
    var user = new User(req.body);
    user.save(function(err) {
        if (err) throw err;

        console.log('Uzytkownik zapisany.', user);
        res.json({
            success: true,
            message: "Uzytkownik zapisany."
        });
    });

}

module.exports = router