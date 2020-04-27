const express = require('express')
const router = express.Router();



const db = require('../models')

// GET new route
router.get('/:id/new',async (req,res) =>{
    try{
        if(!req.session.currentUser){
            return res.redirect('/auth/login')
        }
        const foundUser = await db.User.findById(req.session.currentUser)
        res.render('user/new',{
            user:foundUser,
            title:'new recipe'
        })
    }catch(err){
        res.send(err)
    }
})

router.post('/',async (req,res)=>{
    try{
        if(!req.session.currentUser){
            return res.redirect('/auth/login')
        }
        const newRecipe = await db.Recipe.create(req.body);
        
        const foundUser = await db.User.findById(req.body.user);

        foundUser.recipes.push(newRecipe);
        foundUser.save();
        res.redirect(`user/${req.body.id}`)
    }catch(err){
        res.send(err)
    }
})


// GET index router
router.get('/:id', async (req,res)=>{
    try{
        
        if(!req.session.currentUser){
            return res.redirect('/auth/login')
        }
    const foundUser = await db.User.findById(req.session.currentUser);
    const allrecipes = await db.Recipe.find();

    res.render('user/index',{
        user: foundUser,
        recipes:allrecipes,
        title: foundUser.name
    })
    }catch(err){
        res.send(err)
    }
});


module.exports = router;