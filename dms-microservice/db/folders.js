const Folder = require("../models/folder.model");
const File = require("../models/file.model");

/**
 * Method to fetch all folders
 * @returns folder list
 */
const getFolders = async() => {
    const folders = await Folder.find().exec();
    return folders;
}
/**
 * Method to fetch all folders owned by an user
 * @param {*} userId _id of logged in user
 * @returns folders
 */
const getfoldersByUser = async(userId) => {
    const folders = await Folder.find({user: userId}).exec();
    return folders;
}
/**
 * Method to fetch all files in a folder
 * @param {*} folder _id of folder
 * @returns files
 */
const getFilesInFolder = async(folder) => {
    const files =  await File.find({folder: folder}).exec();
    return files;
}

/**
 * Method to create a new folder
 * @param {*} data payload 
 * @returns created folder
 */
const createFolder = async(data) => {
    const folder =  await Folder.findOne({name: data.name, user: data.user}).exec();
    if(folder) {
        throw new Error('A folder already exist in same name for user');
    }
    const new_folder = new Folder(data);
    const result = await new_folder.save();
    return result;
}

/**
 * Method to fetch folder details
 * @param {*} id _id for folder
 * @returns folder
 */
const getFolder = async(id) => {
    const Folder = await Folder.findOne({_id: id}).select(["name", "user"]);
    return Folder;
}

/**
 * Method to update a folder
 * @param {*} data payload
 * @returns updated folder
 */
const updateFolder = async(data) => {
    const existingfolder =  await Folder.findOne({name: data.name, user: data.userId}).exec();
    if(existingfolder) {
        throw new Error('A folder already exist in same name for user');
    }
    const folder = await Folder.findOneAndUpdate({_id: data.id , user: data.userId}, {name: data.name}, {new: true }).exec()
    return folder;
}
/**
 * Method to delete folder
 * @param {*} data  delete params
 * @returns {success: boolean}
 */
const deleteFolder = async(data) => {
    const folder = await Folder.findOneAndDelete({ _id: data.id, user: data.userId }).exec();
    if(!folder){
        throw new Error('No folder exist with the id for this user');
    }
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