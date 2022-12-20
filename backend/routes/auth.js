const express = require('express');
const User = require('../model/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.post('/', [
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atlast 5 charcater').isLength({ min: 5 }),
],async (req, res) => {
    //If there are errors then return Bad request and error
    console.log(res.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check weather the user with email exists already
    let user = User.findOne({email : req.body.email});
    if(user) {
        return res.status(400).json({ errors: 'Email with this already exists' });
    }

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
     
        
      })
      
    //   .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error: 'pLEASE Enter valid email'})})


})

module.exports = router