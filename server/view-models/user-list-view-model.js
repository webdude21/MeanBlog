function UserListViewModel(user){
    this._id = user._id;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.roles = user.roles;
    this.registerDate = user.registerDate;
    return this;
}

module.exports = {
    getUserListViewModel: function (user) {
        return new UserListViewModel(user);
    }
};