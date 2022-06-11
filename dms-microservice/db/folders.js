const Folder = require("../models/folder.model");
const File = require("../models/file.model");

const getFolders = async() => {
    const folders = await Folder.find().exec();
    return folders;
}


const getfoldersByUser = async(userId) => {
    const folders = await Folder.find({user: userId}).exec();
    return folders;
}
const getFilesInFolder = async(folder) => {
    const files =  await File.find({folder: folder}).exec();
    return files;
}
const createfolders = async(data) => {
    const Folder = new Folder(data);
    const new_Folder = await Folder.save();
    return new_Folder;
}

const getFolder = async(id) => {
    const Folder = await Folder.findOne({_id: id}).select(["name", "user","folder","content"]);
    return Folder;
}

const updateFolder = async(id, data) => {
    const Folder = await Folder.findOneAndUpdate({_id: id}, data, {new: true }).exec()
    return Folder;
}

const deleteFolder = async(id) => {
    const Folder = await Folder.defindOneAndDelete({ id: key }).exec();
    return Folder;
}

module.exports = {
    getFolders,
    getfoldersByUser,
    getFolder,
    createfolders,
    getFilesInFolder,
    updateFolder,
    deleteFolder
}