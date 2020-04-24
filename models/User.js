const mongoose = require('mongoose')

const Recipe = require('./Recipe')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    isProfessionalChef: {
        type: Boolean
    },
    foodPreference: {
        type: Array
    },
    password: {
        type: String,
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User