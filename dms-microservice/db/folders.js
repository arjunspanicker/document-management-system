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
const createFolder = async(data) => {
    const folder =  await Folder.findOne({name: data.name, user: data.user}).exec();
    if(folder) {
        throw new Error('A folder already exist in same name for user');
    }
    const new_folder = new Folder(data);
    const result = await new_folder.save();
    return result;
}

const getFolder = async(id) => {
    const Folder = await Folder.findOne({_id: id}).select(["name", "user"]);
    return Folder;
}

const updateFolder = async(data) => {
    const existingfolder =  await Folder.findOne({name: data.name, user: data.userId}).exec();
    if(existingfolder) {
        throw new Error('A folder already exist in same name for user');
    }
    const folder = await Folder.findOneAndUpdate({_id: data.id , user: data.userId}, {name: data.name}, {new: true }).exec()
    return folder;
}

const deleteFolder = async(data) => {
    console.log("data", data)
    const folder = await Folder.findOneAndDelete({ _id: data.id, user: data.userId }).exec();
    return folder;
}

module.exports = {
    getFolders,
    getfoldersByUser,
    getFolder,
    createFolder,
    getFilesInFolder,
    updateFolder,
    deleteFolder
}