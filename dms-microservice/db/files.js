const File = require("../models/file.model");

/**
 * Method to fetch all files by user
 * @returns files
 */
const getFiles = async() => {
    const files = await File.find().exec();
    return files;
}

/**
 * Method to fetch all files owned by user
 * @param {*} userId id of the logged in user
 * @returns files owned by user
 */
const getFilesByUser = async(userId) => {
    const files = await File.find({user: userId}).exec();
    return files;
}

/**
 * Method to create a new file
 * @param {*} data payload for creating files
 * @returns file
 */
const createFiles = async(data) => {
    const existingfile = await File.findOne({name: data.name, user: data.user}).exec();
    if(existingfile) {
        throw new Error('A File already exist in same name for user');
    }
    const file = new File(data);
    const new_file = await file.save();
    return new_file;
}
/**
 * Method to fetch a file detail
 * @param {*} id - _id of the file
 * @returns file
 */
const getFile = async(id) => {
    const file = await File.findOne({_id: id}).select(["name", "user","folder","content"]).populate('folder');
    return {
        _id: file._id,
        name: file.name,
        content: file.content,
        folderId: file?.folder?._id ? file.folder._id: '',
        folderName: file?.folder?.name ? file.folder.name: '',
    };
}

/**
 * Method to update a new file
 * @param {*} data payload for updating files
 * @returns updated file
 */
const updateFile = async(data) => {
    const existingFile = await File.findOne({name: data.name, user: data.user}).exec();
    if(existingFile) {
        throw new Error('A File already exist in same name for user');
    }
    const file = await File.findOneAndUpdate({_id: data.id}, data, {new: true }).exec()
    return file;
}

/**
 * Method to delete a file by user
 * @param {*} data delete parameters
 * @returns{ success: boolean}
 */
const deleteFile = async(data) => {
    const file = await File.findOneAndDelete({ _id: data.id, user: data.userId }).exec();
    if(!file){
        throw new Error('No file exist with the id for this user');
    }
    return file;
}

module.exports = {
    getFiles,
    getFilesByUser,
    createFiles,
    getFile,
    updateFile,
    deleteFile
}