const express = require('express');
const User = require('../model/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Shreyanshisop';



router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atlast 5 charcater').isLength({ min: 5 }),
], async (req, res) => {
  //If there are errors then return Bad request and error
  console.log(res.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {


    //check weather the user with email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ errors: 'Email with this already exists' });
    }


    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);


    //craete a new user

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data = {
      user: {
        id: user.id
      }
    }

    var authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);
    // res.json(user)
    res.json({ authtoken })


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }


})


// Authenticate user to login
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password acnnot be blank').exists(),
], async (req, res) => {
  console.log(res.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }   
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })
  } catch (error) {
    connsole.error(error.message);
    res.status(500).send("Internal server Error occured");
  }



})

module.exports = router