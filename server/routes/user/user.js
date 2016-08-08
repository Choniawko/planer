var app  = require('express');
var router   = app.Router();
var User   = require('../../models/user'); 

router.list = function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
};

router.create = function (req, res) {
    
    var user = new User(req.body);
    user.save(function(err) {
        if (err) throw err;

        res.json({
            success: true,
            message: "Uzytkownik zapisany."
        });
    });

}

router.userGeytId = function(req, res) {
    User.find({ "_id" : req.params.id }, function(req, user) {
        res.json(user);
    })
} 

module.exports = router