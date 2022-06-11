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
    if (!_.request.email || !request.name ) {
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
    callback(null, _.request);
}
module.exports = {
    getAllUser: getAllUser,
    getUser: getUser,
    createUser: createUser,
    userLogin: userLogin
}