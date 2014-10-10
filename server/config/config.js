var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/meanblog',
        port: process.env.PORT || 1234
    },
    production: {
        rootPath: rootPath,
        db: process.env.MONGOLAB_URI,
        port: process.env.PORT || 1234
    },
    identity: {
        roles: {
            admin: 'admin',
            editor: 'editor',
            author: 'author',
            user: 'user'
        }
    }
};