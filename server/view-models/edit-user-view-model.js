var config = require('../config/config');

function EditUserViewModel(user) {
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.isAdmin = user.isInRole(config.identity.roles.admin);
    this.isEditor = user.isInRole(config.identity.roles.editor);
    this.isAuthor = user.isInRole(config.identity.roles.author);
    this.isUser = user.isInRole(config.identity.roles.user);
}

module.exports = {
    getEditUserViewModel: function (user) {
        return new EditUserViewModel(user);
    }
};