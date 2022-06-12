const file = require("../db/files");

/**
 * Method to get files
 */
const getFiles = (_, callback) => {
    file.getFiles()
    .then((files) => callback(null, {files}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

/**
 * Method to get files by user
 */
const getFilesByUser =  (_, callback) => {
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

/**
 * Method to get file details
 */
const getFile = (_, callback) => {
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

/**
 * Method to create file
 */
const createFile = (_, callback) => {
    if (!_.request.name) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    file.createFiles(_.request)
    .then((file) => callback(null, file))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
/**
 * Method to update file
 */
const updateFile = (_, callback) => {
    if (!_.request.id) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    file.updateFile(_.request)
    .then((file) => callback(null, file))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
/**
 * Method to delete file
 */
const deleteFile = (_, callback) => {
    if (!_.request.id) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    file.deleteFile(_.request)
    .then(() => callback(null, {success: true}))
    .catch((e) => {
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