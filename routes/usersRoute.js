const express = require('express')
const router = express.Router();

const validateToken = require('../middlewares/jwtValidTokenHandler')

const {
    getAllUsers,
    registerUser,
    loginUser,
    currentUser,
} = require('../controllers/userControllers');

router.route('/')
    .get(getAllUsers);

router.route('/register')
    .post(registerUser);

router.route('/login')
    .post(loginUser);

// Private Route (Only accessible to logged in users) --> for that we will need a middleware to authenticate/authorize the logged in user.
router.route('/current')
    .get(
        validateToken,  // This is the middleware for authentication, so that our route is protected and only authentic user can access the "/current" route.
        currentUser
    );

module.exports = router