const express = require('express')
const router = express.Router();



// Show route
/* router.get('/:id', async (req,res) => {
    try{
        const foundUser = await db.User.findById(req.params.id).populate('recipes').exec()
        res.render('user/show', {
            title: 'User Details',
            user: foundUser,
        })
    } catch (err) {
        res.send(err)
    }
}); */


<<<<<<< HEAD
// GET Register route
router.get('/register', (req,res)=>{
    res.render('user/register', {
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
        res.redirect('/users/login');
    } catch (err){
        res.send(err);
    }
})

// GET Login New
router.get('/login', (req,res) => {
    res.render('user/login', {
        title: 'Login',
    })
})

// POST LOGIN Create (Session)
router.post('/login', async (req,res) => {
    // Check for existing user account 
    try {
        const user = await db.User.findOne({email: req.body.email});
        if (!user) {
        return res.render('user/login', {
            title: 'Login',
        });
        }
        // Check passwords
        const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);
        
        if(!passwordsMatch) {
            return res.render('user/login', {
                title: 'Login',
            });
        }
    // Create Session
    // Authentication Part
    req.session.currentUser = user._id;
    res.redirect(`/`);
} catch (error) {
    res.send(err);
}
})



module.exports = router
=======
module.exports = router;
>>>>>>> submaster
