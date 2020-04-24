const mongoose = require('mongoose');
require('mongoose-type-url')

const User = require('./User')

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    typeOfMeal: {
        type: String
    },
    ingredients: {
        type: Array,
        required: true
    },
    pic: {
        type: mongoose.SchemaTypes.Url
    },
    origin: {
        type: String
    },
    serving: {
        type: Number
    },
    direction: {
        type: String
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;