const grpc = require("@grpc/grpc-js");
const User = require("../db/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getAllUser = (_, callback) => {
    User.getAllUsers().then((users) => {
        console.log("users", users)
        callback(null, {users});
    }).catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const getUser = (_, callback) => {
    console.log(_.request);
    User.getUser(_.request.id)
    .then((user)=> {
        if(!user){
            callback({
                message: "user not found",
                code: grpc.status.NOT_FOUND
            });
        }
        callback(null, user)
    })
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    });

}
const createUser = (_, callback) => {
    console.log("create user",_.request);
    if (!_.request.email || !_.request.name ||  !_.request.password) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    User.createUser(_.request)
    .then((user) => callback(null, user))
    .catch((e) => {
        console.log("create errors", e)
        callback(e);
    })
}
const userLogin = (_, callback) => {
    console.log(_.request);
    if (!_.request.email || !_.request.password) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    User.getUserByEmail(_.request.email)
    .then((user)=> {
        if(!user){
            callback({
                message: "user not found",
                code: grpc.status.NOT_FOUND
            });
        }
        console.log("password", user.password);
        bcrypt.compare(_.request.password, user.password)
        .then((result) => {
            if(!result) {
                callback({
                    message: "password does not match",
                    code: grpc.status.INVALID_ARGUMENT
                }); 
            }
            const token = jwt.sign({ user: user._id }, 'secret',{ expiresIn: '10d' });
            callback(null, {token})
        })
    })
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    });
}
module.exports = {
    getAllUser: getAllUser,
    getUser: getUser,
    createUser: createUser,
    userLogin: userLogin
}