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

const getFolderByUser =  (_, callback) => {
    console.log(_.request);
    folder.getfoldersByUser(_.request.userId)
    .then((folders) => callback(null, {folders}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const getFilesInFolder = (_, callback) => {
    console.log(_.request);
    folder.getfoldersByUser(_.request.id)
    .then((files) => callback(null, {files}))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const getFolder = (_, callback) => {
    console.log(_.request);
    folder.getFolder(_.request.id)
    .then((folder) => callback(null, folder))
    .catch((e) => {
        console.log("errors", e)
        callback(e);
    })
}

const createFolder = (_, callback) => {
    console.log(_.request);
    folder.createFolder(_.request)
    .then((folder) => callback(null, folder))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const updateFolder = (_, callback) => {
    console.log(_.request);
    folder.updateFolder(_.request.id, _.request)
    .then((folder) => callback(null, folder))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}
const deleteFolder = (_, callback) => {
    console.log(_.request);
    folder.deleteFolder(_.request.id)
    .then((folder) => callback(null, folder))
    .then((e) => {
        console.log("errors", e)
        callback(e);
    })
}

module.exports = {
    getFolder,
    getFolders,
    getFolderByUser,
    getFilesInFolder,
    createFolder,
    updateFolder,
    deleteFolder
}