const express = require('express')
const router = express.Router();


const db = require('../models')


// GET index route

router.get('/', async(req,res)=>{
    try{
    const allRecipes = await db.Recipe.find()
    res.render('recipes/index',{
        recipes: allRecipes,
        title: 'Recipes'
    })
    }catch(err){
        res.send(err)
    }
})

// SHOW route
router.get('/:id', async (req,res)=>{
    try{
        const foundRecipe = await db.Recipe.findById(req.params.id);
        const foundUser = await db.User.findById(foundRecipe.user);
        res.render('recipes/show',{
            recipe:foundRecipe, 
            user: foundUser,
            title: 'Recipes'
        })
    }catch(err){
        res.send(err)
    }
})


// EDIT GET route
router.get('/:id/edit', async (req,res)=>{
    try{
        if(!req.session.currentUser){
            return res.redirect('/auth/login')
        }
        const foundRecipe = await db.Recipe.findById(req.params.id)

        res.render('recipes/edit',{
            recipe:foundRecipe,
            title:'Edie recipe'
        })
    }catch(err){
        res.send(err)
    }
})

// UPDATE EDIT POST
router.put('/:id', async (req,res) => {
    try {
    const updatedRecipe = await db.Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect(`/recipes/${req.params.id}`)
    } catch (err) {
        return res.send(err)
    }
})






module.exports = router