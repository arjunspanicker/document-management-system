const File = require("../models/file.model");

const getFiles = async() => {
    const files = await File.find().exec();
    return files;
}


const getFilesByUser = async(userId) => {
    const files = await File.find({user: userId}).exec();
    return files;
}

const createFiles = async(data) => {
    const existingfile = await File.findOne({name: data.name, user: data.user}).exec();
    if(existingfile) {
        throw new Error('A File already exist in same name for user');
    }
    const file = new File(data);
    const new_file = await file.save();
    return new_file;
}

const getFile = async(id) => {
    const file = await File.findOne({_id: id}).select(["name", "user","folder","content"]);
    return file;
}

const updateFile = async(data) => {
    const existingFile = await File.findOne({name: data.name, user: data.user}).exec();
    if(existingFile) {
        throw new Error('A File already exist in same name for user');
    }
    const file = await File.findOneAndUpdate({_id: data.id}, data, {new: true }).exec()
    return file;
}

const deleteFile = async(data) => {
    const file = await File.findOneAndDelete({ _id: data.id, user: data.userId }).exec();
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