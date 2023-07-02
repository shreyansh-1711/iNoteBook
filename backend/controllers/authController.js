const User = require(`${__dirname}/../models/UserModel`);
const bcrypt = require("bcrypt");
const signToken = require(`${__dirname}/../utils/token`);
const { validationResult } = require('express-validator');

const saltRounds = 10;

// ROUTE 1: Create a user using: POST 'api/auth/createuser". No login required
exports.createUser = async (req, res) => {

    let success = false;

    // If there are validation errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {email, name, password} = req.body;

        // check whether the user with this email exists already
        let user = await User.findOne({email: email});
        if (user) {
            return res.status(400).json({success, error: "Email already exists"});
        }

        // Salting password
        const salt = await bcrypt.genSalt(saltRounds);
        const secPass = await bcrypt.hash(password, salt);

        // Creating a new user
        user = await User.create({
            name: name,
            email: email,
            password: secPass,
        });

        // Token authentication using JWT
        const authtoken = signToken(user._id);

        // Response
        success = true;
        res.status(201).json({success, authtoken});

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }

}

// ROUTE 2: Authenticate a user using: POST 'api/auth/login". No login required
exports.login = async (req, res) => {

    let success = false;

    // If there are validation errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {email, password} = req.body;

        // Finding if user exists
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        // Matching user password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        // Token authentication using JWT
        const authtoken = signToken(user._id);

        // Response
        success = true;
        res.status(200).json({success, authtoken});

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }

}

// ROUTE 3: Get logged in user details: POST 'api/auth/getuser". Login required
exports.getuser = async (req, res) => {

    try {
        
        // finding user to fetch
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        
        // Response
        res.status(200).json({
            status: 'success',
            results: 1,
            data: {
                user,
            },
        });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error");

    }

}