const express = require('express')
const router = express.Router();


const db = require('../models')


// GET index route

router.get('/', async(req,res)=>{
    try{     
    

        if(!req.session.currentUser){
            return res.redirect('/auth/login')
        }
    console.log(req.session.currentUser)
    const allRecipes = await db.Recipe.find()
    const foundUser = await db.User.findById(req.session.currentUser)
    res.render('recipes/index',{
        recipes: allRecipes,
        title: 'Recipes',
        user_id: foundUser,
         
        
    })
    }catch(err){
        res.send(err)
    }
})

// SHOW route
router.get('/:id', async (req,res)=>{
    try{
        
        if(!req.session.currentUser){
            return res.redirect('/auth/login')
        }
        console.log(req.session.currentUser)
        const foundRecipe = await db.Recipe.findById(req.params.id);
        const foundUser = await db.User.findById(foundRecipe.user);
        res.render('recipes/show',{
            recipe:foundRecipe, 
            user: foundUser,
            title: 'Recipes',
            user_id: req.session.currentUser   
             
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
            title:'Edie recipe',
            user_id: req.session.currentUser   
        
        })
    }catch(err){
        res.send(err)
    }
})

// UPDATE EDIT POST
router.put('/:id', async (req,res) => {
    try {
        if(!req.session.currentUser){
            return res.redirect('/auth/login')
        }
    const updatedRecipe = await db.Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect(`/recipes/${req.params.id}`)
    } catch (err) {
        return res.send(err)
    }
})






module.exports = router