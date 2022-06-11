const grpc = require("@grpc/grpc-js");
const User = require("../db/users");


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
    .then((user)=> callback(null, user))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    });

}
const createUser = (_, callback) => {
    console.log("create user",_.request);
    User.createUser(_.request)
    .then((user) => callback(null, user))
    .catch((e) => {
        console.log("create errors", e)
        callback(e);
    })
}
const userLogin = (_, callback) => {
    console.log(_.request);
    callback(null, _.request);
}
module.exports = {
    getAllUser: getAllUser,
    getUser: getUser,
    createUser: createUser,
    userLogin: userLogin
}