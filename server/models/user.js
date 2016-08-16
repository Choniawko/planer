var mongoose =  require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean,
    email: String,
    firstname: String,
    lastname: String,
}));

User.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMath) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}