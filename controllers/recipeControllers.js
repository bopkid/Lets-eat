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

 //GET new Route

 router.get('/new',async (req,res)=>{
    try{
        const allUser =  await db.User.find({})

        res.render('recipes/new',{
            title:'New Recipes',
            user: allUser
        })
    }catch(err){
        res.send(err)
    }
})



  //POST Recipes Create

 router.post('/', async(req,res)=>{
     try{
     console.log(req.body);

    const newRecipe = await db.Recipe.create(req.body);
    //const foundUser =await db.User.find(req.body.user);
   
    //foundUser.recipes.push(newRecipe)

    //foundUser.save()
   
   res.redirect(`/recipes/${newRecipe._id}`);

     }catch(err){
         res.send(err)
    }
 })

 //GET show route



  //GET Recipes edit
 router.get('/:id/edit', async(req,res)=>{
     try{
    const foundRecipe= await db.Recipe.findById(req.params.id)
    res.render('recipes/edit',{
        recipe:foundRecipe,
        title: 'Edit recipe'
    })
     }catch(err){
         res.send(err)
     }
 })


 router.put('/:id', async(req,res)=>{
     try{
     const updatedRecipe = await db.Recipe.findByIdAndUpdate(
         req.body.id,
         req.body,
         {new:true})
         res.redirect(`/recipes/${req.body.id}`)
     }catch(err){
         res.send(err)
     }
 })


router.get('/:id', async (req,res)=>{
    try{
        const foundRecipe = await db.Recipe.findById(req.params.id)
        res.render('recipes/show',{
            recipe:foundRecipe, 
            title: 'Recipes'
        })
    }catch(err){
        res.send(err)
    }
})

 router.delete('/:id', async (req,res)=>{
     try{
         const deletedRecipe = await db.Recipe.findByIdAndRemove(req.params.id);
         const foundUser  = await db.Recipe.findById(deletedRecipe.user)
         foundUser.recipes.remove(req.params.id)
         foundUser.save()
         res.redirect('/recipes');
     }catch(err){
         res.send(err)
     }
 })




module.exports = router