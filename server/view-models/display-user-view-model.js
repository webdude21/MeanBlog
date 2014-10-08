var config = require('../config/config');

function DisplayUserViewModel(user) {
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
}

module.exports = {
    getDisplayUserViewModel: function (user) {
        return new DisplayUserViewModel(user);
    }
};