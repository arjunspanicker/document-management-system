const User = require('../models/user.model');
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

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    getUserByEmail
}