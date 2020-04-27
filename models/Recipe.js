const mongoose = require('mongoose');
require('mongoose-type-url');



const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //typeOfMeal: {
        //type: String
    //},
    ingredients: {
        type: Array,
        required: true
    },
    url: {
        type: mongoose.SchemaTypes.Url
    },
    origin: {
        type: String
    },
    serving: {
        type: Number
    },
    direction: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
}, {timestamps: true})

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;