const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getAllUsers = async () => {
    const users =  await User.find().exec();
    return users;
}

const createUser = async(data) => {
    data.password = await bcrypt.hash(data.password, 10);
    const user = new User(data);
    const new_user = await user.save();
    return new_user;
}

const getUser = async(id) => {
    const user = await User.findOne({_id: id}).select(["email","name"]).exec();
    return user;
} 

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