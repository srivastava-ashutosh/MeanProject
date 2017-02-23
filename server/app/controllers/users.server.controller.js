var config = require('../../configs/configs');
var globalMethods = require('../../configs/globals');
var User = require('../models/users.server.model').User;
var Book = require('../models/users.server.model').Book;
var MongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');

/*************
User registration
****************/
exports.userRegistration = function(req, res) {
    console.log(req.body)
    userData = req.body;
    var user = new User(userData);
    user.save(function(err) {
        if (err) {
            res.send({
                "errMsg": err,
                status: 0
            })
        } else {
            res.json({
                "msg": "Record has been added successfully..",
                "code": 1
            });
        }
    })
}

/*************
User login
****************/
exports.userlogin = function(req, res) {
    let logindetails = req.body;
    console.log(logindetails);
    User.find({
        email: logindetails.email
    }, function(err, data) {
        console.log(data)
        if (err) {
            res.send({
                "msg": err,
                statu: 0
            })
                // return next(err);
            } else {
                if (data[0].email == logindetails.email && data[0].password == logindetails.password) {
                    let token = globalMethods.getToken(logindetails);
                    let isAdmin = globalMethods.checkAdmin(logindetails.email);
                    if (isAdmin) {
                        var role = 'admin';
                    } else {
                        var role = 'user';
                    }

                    global.permission.push({
                        "emailID": "" + data[0].email + "",
                        "tokenID": "" + token + "",
                        "role": role
                    })
                    var userArr = globalMethods.eliminateDuplicates(global.permission);
                    global.permission = userArr
                    console.log(global.permission,"global.permission");
                    res.status(201)
                    res.send({
                        msg: "You have successfully loggedin",
                        status: 1,
                        role: role,
                        username: "" + data[0].firstName + " " + data[0].lastName + "",
                        email: "" + data[0].email + "",
                        token: "" + token + "",
                        users: global.permission
                    });
                } else {
                    res.send({
                        msg: "Username or Password not correct",
                        status: 0
                    })
                }
            }
        });
}

/*************
List of all user
****************/
exports.userList = function(req, res, next) {
    if (globalMethods.isAuthorised(req.headers.authorization)) {
        User.find({}, function(err, data) {
            if (err) {
                res.send({
                    "errMsg": err,
                    code: 0
                })
                    // return next(err);
                } else {

                    res.json(data);
                }
            });
    } else {
        res.send({
            msg: "Unauthorized Access !",
            logout: 1
        });
    }
};

/*************
logout
****************/
exports.logout = function(req, res) {
    console.log("prelogout: ", global.permission)
    let auth = req.headers.authorization;
    let index = globalMethods.getTokenIndex(global.permission, auth)

    console.log("index: ", index)
    if (index > -1) {
        global.permission.splice(index, 1);
        console.log("logout: ", global.permission)
        res.send({
            msg: "susscessfully logout",
            logout: 1
        });
    } else {
        res.send({
            msg: "Session timeout",
            logout: 1
        });
    }

};
exports.findUserId = function(req, res){
    let userId = req.params.id;
    User.findById(userId, function(err, obj) {
        if (err) {
            res.send({
                "errMsg": err,
                code: 0
            })
                    // return next(err);
                } else {
                    res.json(obj);
                }
            });
}
exports.findUserByEmail = function(req, res){
    let userId = req.params.email;
    User.findOne({email:userId}, function(err, obj) {
        if (err) {
            res.send({
                "errMsg": err,
                code: 0
            })
                    // return next(err);
                } else {
                    res.json(obj);
                }
            });
}

/* Basic CRUD Operation with single collection */
// Insert Record //
exports.InsertBook = function(req, res) {
    console.log(req.body,"19")
    userData = req.body;
    var books = new Book(userData);
    books.save(function(err) {
        if (err) {
            res.send({
                "errMsg": err,
                status: 0
            })
        } else {
            res.json({
                "msg": "Record has been added successfully..",
                "code": 1
            });
        }
    })
}

// Find the list of record //
exports.FindBook = function(req,res){
    console.log("list all the book")
    Book.find({})
    .exec(function(err,result){
        if(err)
        {
            res.send("error has occured")
        }
        else
        {
            console.log("result",result);
            res.json(result);
        }
    })
}

// Find Record Id Specific //
exports.FindBookById = function(req, res){
    let userId = req.params.id;
    Book.findById(userId).populate('users', 'firstName lastName email').exec(function(err, obj) {
        if (err) {
            res.send({
                "errMsg": err,
                code: 0
            })
                    // return next(err);
                } else {
                    res.json(obj);
                }
            });
}

// Update Specific Record //
exports.UpdateBook = function(req,res){
    Book.findByIdAndUpdate(
        req.params.id
        ,req.body,
        {upsert:true},
        function(err,newBook){
            if(err)
            {
                console.log("Error Occured")
            }
            else
            {
                console.log(newBook)
                res.send(newBook)
            }
        })
}
// Remove Specific Record //
exports.RemoveBook = function(req,res){
    Book.findByIdAndRemove(
        req.params.id,
        function(err,newBook){
            if(err)
            {
                console.log("Error Occured")
            }
            else
            {
                console.log(newBook)
                res.send(newBook)
            }
        })
}