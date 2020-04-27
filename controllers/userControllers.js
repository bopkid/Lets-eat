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
        
        res.redirect(`user/${foundUser._id}`)


    }catch(err){
        res.send(err)
    }
})

// Show route
 router.get('/:id', async (req,res) => {
 try {
        const allRecipe = await db.Recipe.find()
        const foundUser = await db.User.findById(req.params.id)
        .populate('recipes')
        .exec();

        res.render('user/show', {
            recipes: allRecipe,
            title: 'User Details',
            user: foundUser,
        })
    } catch (err) {
        res.send(err)
    }
});

// EDIT ROUTE
router.get('/:id/edit', async (req,res) => {
    try {
    const foundUser = await db.User.findById(req.params.id)
    res.render('user/edit', {
        title: `Edit ${foundUser.name}`,
        user: foundUser
    })
} catch (err) {
    return res.send(err)
}
})

// UPDATE EDIT POST
router.put('/:id', async (req,res) => {
    try {
    const updatedUser = await db.User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect(`/user/${req.params.id}`)
    } catch (err) {
        return res.send(err)
    }
})

// DELETE ROUTE Destroy
// :id is a property
// :_id property of a record on a database
router.delete('/:id', async (req,res) => {
    try {
    const deletedUser = await db.User.findByIdAndDelete(req.params.id)
    const result = await db.Recipe.deleteMany({user: req.params.id})
    console.log('Delete Many Result = ', result)
    res.redirect('/')
    }
    catch (err) {
        return res.send(err)
    }
})


// Index GET route

router.get('/:id/recipes',async (req,res)=>{
    try{
        const foundUser = await db.User.findById(req.params.id)
        .populate('recipes')
        .exec();
        res.render('user/index',{
            title:'My Recipe',
            user:foundUser
        })
    }catch(err){
        res.send(err)
    }
})






module.exports = router;
