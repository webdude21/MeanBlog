var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');
var config = require('../config/config');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    },
    isInRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'webdude');
            User.create({username: 'webdude', firstName: 'Dimo', lastName: 'Petrov', salt: salt,
                hashPass: hashedPwd, roles: [config.identity.roles.admin]});
            console.log('Users added to database...');
        }
    });
};