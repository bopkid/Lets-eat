const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router();


const db = require('../models')


// GET Register route
router.get('/register', (req,res)=>{
    res.render('auth/register', {
        title: 'Register',
    })
});

// POST Register Create (User)
router.post('/register', async (req,res) => {
    // Validating
    try {
        if(req.body.isProfessionalChef === 'on'){
            req.body.isProfessionalChef = true
        } else {
            req.body.isProfessionalChef = false
        }        // Create a New User
        const user = await db.User.findOne({email: req.body.email})
        // Check if we got a user object back from the database
        if(user) {
            return res.send('<h1>Account already exists, please log in</h1>')
        }
        // Generate salt (adds complication to our password hash)
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const userData = {
            name: req.body.name,
            email: req.body.email,
            isProfessionalChef: req.body.isProfessionalChef,
            foodPreference: req.body.foodPreference,
            password: hash,
        }
        // Creating the new user
        await db.User.create(userData);
        // Redirect to login page
        res.redirect('/auth/login');
    } catch (err){
        res.send(err);
    }
})

// GET Login New
router.get('/login', (req,res) => {
    res.render('auth/login', {
        title: 'Login',
    })
})

// POST LOGIN Create (Session)
router.post('/login', async (req,res) => {
    // Check for existing user account 
    try {
        const user = await db.User.findOne({email: req.body.email});
        if (!user) {
        return res.render('auth/login', {
            title: 'Login',
        });
        }
        // Check passwords
        const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);
        
        if(!passwordsMatch) {
            return res.render('auth/login', {
                title: 'Login',
            });
        }
    // Create Session
    // Authentication Part
    req.session.currentUser = user._id;
    res.redirect(`/users/${user._id}`);
} catch (error) {
    res.send(err);
}
})

// GET Logout Destroy (Session) 
router.get('/logout', async (req,res) => {
    try{
        await req.session.destroy();
        res.redirect('/')
    } catch (err) {
        res.send(err)
    }
})



module.exports = router