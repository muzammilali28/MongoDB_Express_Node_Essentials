const asyncHandler = require("express-async-handler")
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @description gets All the users
 * @route GET -> /api/users
 * @access public
*/
const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json({ message: "All Users found", users: allUsers });
});

/**
 * @description Register a new user
 * @route POST -> /api/users/register
 * @access public
*/
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fileds are Mandatory");
    }

    // Check if somehow the user already exists or not (extra layer of security to check duplication of registered users)
    const userAvailable = await User.findOne({ email });

    // If a user is found, this means he/she is already registered , throw an error insted
    if (userAvailable) {
        res.status(400);
        throw new Error("User Already Registered");
    }

    // Else create that new user with a hased password for security purposes.

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Create the User with Hashed Password
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (newUser) {
        res.status(201).json({ message: "User has been registered", userID: newUser._id.toString(), email: newUser.email });
    }
    else {
        res.status(400);
        throw new Error("User Data is Not Valid");
    }
});

/**
 * @description Login the user
 * @route POST -> /api/users/login
 * @access public
*/
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All Fileds are Mandatory");
    }

    // If the User is Registered already then proceed to comparing the users' entered password with the DB stored hashed password
    const userFound = await User.findOne({ email });

    if (userFound && await bcrypt.compare(password, userFound.password)) {

        const accessToken = jwt.sign({
            user: {
                username: userFound.username,
                email: userFound.email,
                id: userFound._id.toString(),
            }
        },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: "5m" }
        );

        res.status(200).json({ token: accessToken })
    }
    else {
        res.status(401);
        throw new Error("Email or Password is NOT VALID!!")
    }
});

// Private Controller (Only accessible to logged in users) (Protected Route)
/**
 * @description Get the Current Logged in User Account
 * @route GET -> /api/users/current
 * @access protected by a (middleware)
*/
const currentUser = asyncHandler(async (req, res) => {

    console.log(req.userClient)  // req Object with userClient value, set by the middleware after successfull authentication

    res.status(200).json({ message: req.userClient })
});

// Exports out All the Controllers
module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    currentUser
}