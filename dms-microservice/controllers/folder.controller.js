const folder = require("../db/folders");

/**
 * Method to get folders
 */
const getFolders = (_, callback) => {
    folder.getFolders()
    .then((folders) => callback(null, {folders}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
/**
 * Method to get folders by user
 */
const getFoldersByUser =  (_, callback) => {
    if(!_.request.userId){
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.getfoldersByUser(_.request.userId)
    .then((folders) =>callback(null, {folders}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

/**
 * Method to get files in folder
 */
const getFilesInFolder = (_, callback) => {
    if(!_.request.id){
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.getFilesInFolder(_.request.id)
    .then((files) => callback(null, {files}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

/**
 * Method to get folder details
 */
const getFolder = (_, callback) => {
    if(!_.request.id){
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.getFolder(_.request.id)
    .then((folder) => {
        if(!folder){
            callback({
                message: "folder not found",
                code: grpc.status.NOT_FOUND
            });
        }
        callback(null, folder)
    })
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

/**
 * Method to create folder
 */
const createFolder = (_, callback) => {
    if (!_.request.name) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.createFolder(_.request)
    .then((folder) => callback(null, folder))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

/**
 * Method to update folder
 */
const updateFolder = (_, callback) => {
    if (!_.request.id || !_.request.userId) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.updateFolder(_.request)
    .then((folder) => callback(null, folder))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
/**
 * Method to delete folder
 */
const deleteFolder = (_, callback) => {
    if (!_.request.id) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.deleteFolder(_.request)
    .then(() => callback(null, {success: true}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

module.exports = {
    getFolder,
    getFolders,
    getFoldersByUser,
    getFilesInFolder,
    createFolder,
    updateFolder,
    deleteFolder
}