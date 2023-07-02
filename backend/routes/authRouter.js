const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const authController = require(`${__dirname}/../controllers/authController`);
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);



// Route 1: create a User using: POST "api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password should contain atleast 5 characters').isLength({ min: 5 })
], authController.createUser);


// Route 2:authenticate a User using: POST "api/auth/login". No login required
router.post('/login', [
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password cannot be blank").exists(),
], authController.login);

// Route 3:Get logged in user details using: POST "api/auth/getuser". Login required

router.get('/getuser', fetchUser, authController.getuser);

module.exports = router
