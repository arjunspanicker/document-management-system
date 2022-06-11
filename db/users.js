const User = require('../models/user.model');

const getAllUsers = async () => {
    const users =  await User.find().exec();
    return users;
}

const createUser = async(data) => {
    const user = new User(data);
    const new_user = await user.save();
    return new_user;
}

const getUser = async(id) => {
    const user = await User.findOne({_id: id}).select(["email","name"]).exec();
    return user;
} 

module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    getUser: getUser
}