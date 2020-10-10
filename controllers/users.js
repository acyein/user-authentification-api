const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../middleware/validation');

// Register user
exports.registerUser = async (req, res) => {
    // Validate user input before creating user
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if user is already in DB
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10); // 10 rounds
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        bio: req.body.bio,
        interest: req.body.interest
    });
    try {
        const savedUser = await user.save();
        // res.send(savedUser);
        res.json({
            message: 'Succcess! You are now registered',
            info: savedUser
        })
    } catch(err) {
        res.status(400).send(err);
    }
};

// Login user
exports.loginUser = async (req, res) => {
    // Validate user input before logging in user
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Check if user is already in DB
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email not found');

    // Check if password is correct
    // Compare pw from input and hashed pw from db
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Incorrect password');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('authToken', token).status(200).json({
        message: 'Success! You are now logged in',
        authToken: token
    });
};

// Display my profile
exports.getMyProfile = async (req, res) => {
    // console.log(req.user);
    // const foundUser = await User.findOne({ _id: req.user._id }); // Another method
    const foundUser = await User.findById(req.user._id);
    if(!foundUser) return res.status(400).send('User not found');
    if(foundUser) return res.send(foundUser);
};

// Display another user's profile
exports.getOthersProfile = async (req, res) => {
    // const foundUser = await User.findOne({ _id: req.params.id });
    const foundUser = await User.findById(req.params.id);
    const fullName = `${foundUser.firstName} ${foundUser.lastName}`;
    if(!foundUser) return res.status(400).send('User not found');
    if(foundUser) return res.json({
        "pageTitle": `Welcome to ${fullName}'s profile! :)`,
        "name": fullName,
        "bio": foundUser.bio,
        "interest": foundUser.interest
    });
};