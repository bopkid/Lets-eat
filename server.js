// Bring in express
const express = require('express')

// Invoke Express
const app = express();

// Express Session
const session = require('express-session')

// Bring in body-parser
const bodyParser = require('body-parser');

// Bring in Method-Override
const methodOverride = require('method-override');

// Port Activation
const port = process.env.PORT || 4000;
console.log('The Value of test = ', process.env.TEST)

// Link public directory
app.use(express.static(__dirname + '/public'));

const authController = require('./controllers/authController')
const userController = require('./controllers/userControllers')
const recipeController = require('./controllers/recipeControllers')

// Set View Engine
app.set('view engine', 'ejs')

// ---------------------------------------- MIDDLEWARE-----------------
// Express Session
app.use(session({
    secret: 'jfiewo;ajio23r243f4igjowssieowi;oiwajawqwbbcd', 
    resave: false, 
    saveUninitialized: false, 
}))

// Init body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));

// =========================================routes ==================

app.get('/', (req,res) => {
    res.render('index', {
        title: 'Home'
    });
});

app.use('/auth', authController)
app.use('/user', userController)
app.use('/recipes',recipeController)

// ------------------------------------------ SERVER LISTENER -------------

app.listen(port, () => console.log(`Server is running on port ${port}`));