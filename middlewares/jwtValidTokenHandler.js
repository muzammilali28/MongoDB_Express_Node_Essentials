const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")


const validateToken = asyncHandler(async (req, res, next) => {

    let token;
    const receivedToken = req.headers.Authorization || req.headers.authorization;

    if (receivedToken && receivedToken.startsWith("Bearer")) {
        token = receivedToken.split(" ")[1];
        token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decode) => {
            if (err) {

                console.log(err);  // Just to check what Error does the jwt.verify gives incase, token is not valid

                res.status(400);
                throw new Error("User is not Authorized")
            }
            return decode;
        })

        if (token) {

            console.log("User with email : \\\\" + token.user.email + "// is authorized")

            // Setting the HTTP "req" parameter with a new key/value pair of key -> userClient , value -> Object(token.user)
            // As this is a middleware so if you set anything to the HTTP "req" object it will be available to the next() route
            req.userClient = token.user;
            next();
        }
        else {

            res.status(401);
            throw new Error("User is not Authorized or Token is Missing")
        }
    }
});

module.exports = validateToken;