const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    login: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
    }
}, {
    timestamps: true
});


const model = mongoose.model('User', userSchema);
module.exports = model;
