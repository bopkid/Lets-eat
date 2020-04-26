const mongoose = require('mongoose')



const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    name: {
        type: String,
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