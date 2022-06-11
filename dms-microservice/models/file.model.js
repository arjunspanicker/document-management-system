const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    folder: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Folder'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
    }
},
{
    timestamps: true
});

const File = mongoose.model('File', fileSchema);
module.exports = File;