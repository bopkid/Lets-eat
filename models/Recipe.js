const mongoose = require('mongoose');
require('mongoose-type-url');

const User = require('./User')

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
        type: String,
        ref:'url'
    },
    ratings: {
        type: [Number]
    },
    origin: {
        type: String
    },
    serving: {
        type: Number
    },
    direction: {
        type: Array,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
}, {timestamps: true})

RecipeSchema.virtual('avgRating')
  .get(function() {
    let avgRating = 0;
    let sum = 0
    this.ratings.forEach((rating)=> {
      sum+=rating;
    })
    if(sum>0) {
      avgRating = (sum/this.ratings.length).toFixed(1)
    }
    return avgRating;
  })

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
