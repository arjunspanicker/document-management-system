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
    const file = new File(data);
    const new_file = await file.save();
    return new_file;
}

const getFile = async(id) => {
    const file = await File.findOne({_id: id}).select(["name", "user","folder","content"]);
    return file;
}

const updateFile = async(id, data) => {
    const file = await File.findOneAndUpdate({_id: id}, data, {new: true }).exec()
    return file;
}

const deleteFile = async(id) => {
    const file = await File.defindOneAndDelete({ id: key }).exec();
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