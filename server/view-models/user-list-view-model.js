function UserListViewModel(user){
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.roles = user.roles;
}

module.exports = {
    getUserListViewModel: function (user) {
        return new UserListViewModel(user);
    }
};