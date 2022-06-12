const User = require('../models/user.model');
const Folder = require("../models/folder.model");
const File = require("../models/file.model");
const bcrypt = require('bcryptjs');

/**
 * Method to create all users
 * @returns users
 */
const getAllUsers = async () => {
    const users =  await User.find().exec();
    return users;
}

/**
 * Method to create new user
 * @param {*} data payload
 * @returns user
 */
const createUser = async(data) => {
    data.password = await bcrypt.hash(data.password, 10);
    const user = new User(data);
    const new_user = await user.save();
    return new_user;
}
/**
 * Method to get user details
 * @param {*} id _id of user
 * @returns user
 */
const getUser = async(id) => {
    const user = await User.findOne({_id: id}).select(["email","name"]).exec();
    return user;
} 

/**
 * Method to fetch user details by email
 * @param {*} email email of user
 * @returns user details
 */
const getUserByEmail = async(email) => {
    const user = await User.findOne({email}).select(["email","password"]).exec();
    return user;
}
/**
 * Method to fetch folder and files in root level
 * @param {*} id user id
 * @returns files and folders
 */
const getRootFilesAndFolder = async(id) => {
    const folders = await Folder.find({user: id}).exec();
    const files = await File.find({user: id, folder: null}).exec();
    return {
        folders,
        files
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    getUserByEmail,
    getRootFilesAndFolder
}