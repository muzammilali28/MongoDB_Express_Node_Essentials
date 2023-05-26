const express = require('express');
const router = express.Router();

const {
    getAllContacts,
    createContact,
    getUserByID,
    updateUserByID,
    deleteUserByID
} = require("../controllers/contactControllers");


router.route("/")
    .get(getAllContacts)
    .post(createContact)

router.route("/:id")
    .get(getUserByID)
    .put(updateUserByID)
    .delete(deleteUserByID)

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