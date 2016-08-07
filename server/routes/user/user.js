var app  = require('express');
var router   = app.Router();
var User   = require('../../models/user'); 

router.list = function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
};

module.exports = router