const grpc = require("@grpc/grpc-js");
const User = require("../db/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Method to fetch all users
 */
const getAllUser = (_, callback) => {
    User.getAllUsers().then((users) => callback(null, {users})).catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
/**
 * Method to fetch user details
 */
const getUser = (_, callback) => {
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
/**
 * Method to create user
 */
const createUser = (_, callback) => {
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
/**
 * Method for user login
 */
const userLogin = (_, callback) => {
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