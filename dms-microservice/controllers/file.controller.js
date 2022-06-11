const file = require("../db/files");

const getFiles = (_, callback) => {
    console.log(_.request);
    file.getFiles()
    .then((files) => callback(null, {files}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

const getFilesByUser =  (_, callback) => {
    console.log(_.request);
    if(!_.request.userId){
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    file.getFilesByUser(_.request.userId)
    .then((files) => callback(null, {files}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

const getFile = (_, callback) => {
    console.log(_.request);
    if(!_.request.id){
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    file.getFile(_.request.id)
    .then((file) =>{
        if(!file){
            callback({
                message: "file not found",
                code: grpc.status.NOT_FOUND
            });
        }
         callback(null, file)
        })
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

const createFile = (_, callback) => {
    console.log(_.request);
    if (!request.name) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    file.createFiles(_.request)
    .then((file) => callback(null, file))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const updateFile = (_, callback) => {
    console.log(_.request);
    if (!request.id) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    file.updateFile(_.request.id, _.request)
    .then((file) => callback(null, file))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const deleteFile = (_, callback) => {
    console.log(_.request);
    if (!request.id) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    file.deleteFile(_.request.id)
    .then(() => callback(null, {success: true}))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}

module.exports = {
    getFile,
    createFile,
    updateFile,
    deleteFile,
    getFiles,
    getFilesByUser
}