var encryption = require('../utilities/encryption');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Article = mongoose.model('Article');
var USER_ALREADY_EXISTS = 'User with the same name already exists';
var viewModels = require('../view-models');
var config = require('../config/config');
var PAGE_SIZE = 10;

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        User.find({username: newUserData.username}).exec(function (err, collection) {
            if (collection.length > 0) {
                console.log(USER_ALREADY_EXISTS);
                res.status(400);
                return res.send({reason: USER_ALREADY_EXISTS});
            } else {
                newUserData.salt = encryption.generateSalt();
                newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                User.create(newUserData, function (err, user) {
                    if (err) {
                        console.log('Failed to register new user: ' + err);
                        return;
                    }

                    req.logIn(user, function (err) {
                        if (err) {
                            res.status(400);
                            return res.send({reason: err.toString()});
                        }

                        res.send(user);
                    })
                });
            }
        });
    },
    updateUser: function (req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function () {
                res.end();
            })
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    getUser: function(req, res) {
        var username = req.params.username;
        User.findOne({ username: username}).exec(function (err, user) {
            if (err) {
                console.log('User could not be loaded: ' + err);
                res.status(500);
                res.send("Database error.")
            }
            if (user) {
                var viewModel = viewModels.DisplayUserViewModel.getDisplayUserViewModel(user);
                Article.find({author:user._id, hidden: false}).exec(function(err, articles){
                    if (err) {
                        console.log('Articles could not be loaded: ' + err);
                        res.status(500);
                        res.send("Database error.")
                    }
                    viewModel.articles = [];
                    articles.forEach(function(article){
                        viewModel.articles.push(viewModels.ListArticleViewModel.getListArticleViewModelFromArticle(article));
                    });

                    res.json(viewModel);
                })
            }
            else {
                res.status(404);
                res.send("No such user.")
            }
        })
    },
    getAllUsers: function (req, res) {
        var gridRequest = req.body;

        var query = User.find({});
        var countQuery = User.find({});
        addFilters(gridRequest.columns, query);
        addFilters(gridRequest.columns, countQuery);
        countQuery.count({}, function (err, totalUsersCount) {
            gridRequest.pager.totalPages = calculateTotalPages(totalUsersCount);
            gridRequest.pager.currentPage = gridRequest.pager.currentPage > gridRequest.pager.totalPages ?
                gridRequest.pager.totalPages :gridRequest.pager.currentPage;

            var currentPage = gridRequest.pager.currentPage;
            if (currentPage < 1) {
                currentPage = 1;
            }

            var sortObject = {};
            sortObject[gridRequest.sort.columnName] = gridRequest.sort.order;
            query
            .sort(sortObject)
            .skip((currentPage - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .exec(function (err, users) {
                if (err) {
                    console.log('Users could not be loaded: ' + err);
                }
                countQuery.count({}, function (err, totalUsersCount) {
                    var viewModel = [];
                    if(users) {
                        users.forEach(function (user) {
                            viewModel.push(viewModels.UserListViewModel.getUserListViewModel(user))
                        });
                    }

                    gridRequest.data = viewModel;
                    res.json(gridRequest);
                })
            })
        });
    },
    editUser: function (req, res) {
        var username = req.params.username;
        User.findOne({ username: username}).exec(function (err, user) {
            if (err) {
                console.log('User could not be loaded: ' + err);
            }
            if (user) {
                var viewModel = viewModels.EditUserViewModel.getEditUserViewModel(user);
                res.send(viewModel);
            }
            else {
                res.status(404);
                res.send("No such user.")
            }
        })
    },
    updateUserRoles: function (req, res) {
        var userData = req.body;
        User.findOne({username: userData.username}).exec(function (err, user) {
            if (err) {
                console.log('User could not be loaded: ' + err);
            }
            if (user) {
                user.roles = [];
                //if(v.isAdmin){
                user.roles.push(config.identity.roles.admin);
                //}
                if (userData.isEditor) {
                    user.roles.push(config.identity.roles.editor);
                }
                if (userData.isAuthor) {
                    user.roles.push(config.identity.roles.author);
                }
                if (userData.isUser) {
                    user.roles.push(config.identity.roles.user);
                }
                user.save(function (err) {
                    if (err) {
                        console.log('User could not be updated: ' + err);
                        res.badRequest('Bad request');
                    }
                    res.send('Ok');
                })
            }
            else {
                res.status(404);
                res.send("No such user.")
            }
        });
    }
};

function calculateTotalPages(totalUsersCount) {
    var totalPages = (totalUsersCount + PAGE_SIZE - 1) / PAGE_SIZE;
    totalPages = Math.floor((totalPages));

    return totalPages;
}

function addFilters(columns, query){
    if(columns) {
        columns.forEach(function (column) {
            if (column.filter != undefined && column.filter != '') {
                var filterObject = {};
                filterObject[column.name] = new RegExp('^' + column.filter);
                query.where(filterObject);
            }
        });
    }
}

var gridResult = {
    pager: {
        currentPage: 1,
        totalPages: 10
    },
    sort: {
        columnName: "username",
        order: "desc"
    },
    data: []
};

