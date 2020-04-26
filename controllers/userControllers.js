const express = require('express')
const router = express.Router();
const db = require('../models')

router.get('/:id', async (req,res)=>{
    try{
        console.log(req.session._id)
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

router.get('/new',async (req,res) =>{
    try{
        if(!req.session.currentUser){
            return res.redirect('/auth/login')
        }
        const foundUser = await db.User.findById(req.session.currentUser)
    }catch(err){
        res.send(err)
    }
})



module.exports = router;