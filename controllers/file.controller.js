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
    file.getFilesByUser(_.request.userId)
    .then((files) => callback(null, {files}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

const getFile = (_, callback) => {
    console.log(_.request);
    file.getFile(_.request.id)
    .then((file) => callback(null, file))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

const createFile = (_, callback) => {
    console.log(_.request);
    file.createFiles(_.request)
    .then((file) => callback(null, file))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const updateFile = (_, callback) => {
    console.log(_.request);
    file.updateFile(_.request.id, _.request)
    .then((file) => callback(null, file))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const deleteFile = (_, callback) => {
    console.log(_.request);
    file.deleteFile(_.request.id)
    .then((file) => callback(null, file))
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