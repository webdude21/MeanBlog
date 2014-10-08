var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');
var config = require('../config/config');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    registerDate: { type: Date, default: Date.now },
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

function userSeed(salt, hashedPwd) {
    User.create({username: 'webdude', firstName: 'Димо', lastName: 'Петров', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.admin]});
    User.create({username: 'pirin', firstName: 'Пирин', lastName: 'Карабенчев', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.admin]});
    User.create({username: 'kizisoft', firstName: 'Иван', lastName: 'Кизирян', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.admin]});
    User.create({username: 'lnxslackware', firstName: 'Светослав', lastName: 'Иванов', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.admin]});
    User.create({username: 'pesho', firstName: 'Пешо', lastName: 'Фитнеса', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.editor]});
    User.create({username: 'gosho', firstName: 'Гошо', lastName: 'Точния', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.user]});
    User.create({username: 'sasho', firstName: 'Саши', lastName: 'Красивия', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.author]});
    User.create({username: 'kiro', firstName: 'Киро', lastName: 'Пора', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.author]});
    User.create({username: 'assy', firstName: 'Асенчо', lastName: 'Махленския', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.author]});
    User.create({username: 'mimi', firstName: 'Мими', lastName: 'Шматката', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.author]});
    User.create({username: 'lnxslackware', firstName: 'Светослав', lastName: 'Иванов', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.admin]});
    User.create({username: 'ivaylo.kenov', firstName: 'Ivaylo', lastName: 'Kenov', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.user]});
    User.create({username: 'Nikolay.IT', firstName: 'Nikolay', lastName: 'Kostov', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.author]});
    User.create({username: 'Doncho', firstName: 'Doncho', lastName: 'Minkov', salt: salt,
        hashPass: hashedPwd, roles: [config.identity.roles.user]});
}
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
            hashedPwd = encryption.generateHashedPassword(salt, 'secret');
            userSeed(salt, hashedPwd);
            console.log('Users added to database...');
        }
    });
};