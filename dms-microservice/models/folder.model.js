const mongoose = require('mongoose');
const { Schema } = mongoose;

const folderSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    timestamps: true
});

const Folder = mongoose.model('Folder', folderSchema);
module.exports = Folder;