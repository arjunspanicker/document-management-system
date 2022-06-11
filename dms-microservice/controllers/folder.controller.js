const folder = require("../db/folders");

const getFolders = (_, callback) => {
    console.log(_.request);
    folder.getFolders()
    .then((folders) => callback(null, {folders}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

const getFoldersByUser =  (_, callback) => {
    console.log(_.request);
    if(!_.request.userId){
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.getfoldersByUser(_.request.userId)
    .then((folders) => callback(null, {folders}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const getFilesInFolder = (_, callback) => {
    console.log(_.request);
    if(!_.request.id){
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.getfoldersByUser(_.request.id)
    .then((files) => callback(null, {files}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const getFolder = (_, callback) => {
    console.log(_.request);
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

const createFolder = (_, callback) => {
    console.log(_.request);
    if (!request.name) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.createFolder(_.request)
    .then((folder) => callback(null, folder))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const updateFolder = (_, callback) => {
    console.log(_.request);
    if (!request.id) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.updateFolder(_.request.id, _.request)
    .then((folder) => callback(null, folder))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const deleteFolder = (_, callback) => {
    console.log(_.request);
    if (!request.id) {
        callback({
            message: "Bad Request",
            code: grpc.status.INVALID_ARGUMENT
        })
    }
    folder.deleteFolder(_.request.id)
    .then(() => callback(null, {success: true}))
    .then((e) => {
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