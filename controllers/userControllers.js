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

// Show route
 router.get('/:id', async (req,res) => {
 try {
        const foundUser = await db.User.findById(req.params.id)
        .populate('recipes')
        .exec();

        res.render('user/show', {
            title: 'User Details',
            user: foundUser,
        })
    } catch (err) {
        res.send(err)
    }
});


module.exports = router;
