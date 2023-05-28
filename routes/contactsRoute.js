const express = require('express');
const validateToken = require('../middlewares/jwtValidTokenHandler')
const router = express.Router();

const {
    getAllContacts,
    createContact,
    getContactByID,
    updateContactByID,
    deleteContactByID
} = require("../controllers/contactControllers");

// Using this Middleware above all the controllers will make sure each
// and evey route/controller is protected via this middleware.
router.use(validateToken);

router.route("/")
    .get(getAllContacts)
    .post(createContact)

router.route("/:id")
    .get(getContactByID)
    .put(updateContactByID)
    .delete(deleteContactByID)

module.exports = router;

// Below is another way to write routes if they have a same URL to handel all the specific defined routes requests.

// router.route("/:id")
// .get((req,res)=>{
//     res.status(200).json({message:`Fetched Contact with ID: ${req.params.id}`});
// })
// .put((req,res)=>{
//     res.status(200).json({message:`Updated Contact with ID: ${req.params.id}`});
// })
// .delete((req,res)=>{
//     res.status(200).json({message:`Deleted Contact with ID: ${req.params.id}`});
// });