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

app.use('/recipes',recipeController)

// ------------------------------------------ SERVER LISTENER -------------

app.listen(port, () => console.log(`Server is running on port ${port}`));