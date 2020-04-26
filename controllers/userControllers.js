const express = require('express')
const router = express.Router();

const db = require('../models')


// Show route
 router.get('/:id', async (req,res) => {
 try {
        const foundUser = await db.User.findById(req.params.id).populate('recipes').exec()
        res.render('user/show', {
            title: 'User Details',
            user: foundUser,
        })
    } catch (err) {
        res.send(err)
    }
});


module.exports = router;
