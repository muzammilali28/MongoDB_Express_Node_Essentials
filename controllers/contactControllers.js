// The purpose of using this Async Handler in Express is to avoid writing the TRY-CATCH block when working/quering MongoDB
// if a errors occurs it will be passed on to the errorHandler middleware insted.

const Contact = require('../models/contactModel');
const asyncHandler = require("express-async-handler");

/**
 * @description Gets All the contacts
 * @route GET -> /api/contact
 * @access public
*/
// Get All the Data in the Collection
const getAllContacts = asyncHandler(async (req, res) => {

    const contacts = await Contact.find({});

    res.status(200).json({ message: "Get All Contacts", contacts: contacts });
});

/**
 * @description Create a new Contact
 * @route POST -> /api/contact
 * @access public
*/
// Create a new Contact and add to the collection
const createContact = asyncHandler(async (req, res) => {

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    })

    res.status(201).json({ message: "Contact Created", contact: contact });
});

/**
 * @description Get a single contact with specific ID
 * @route GET -> /api/contact/:id
 * @access public
*/
// Get the Single Document in the Collection which has the /api/contact/:id ---> id
const getUserByID = asyncHandler(async (req, res) => {

    const { id } = req.params
    const { name } = req.query

    console.log(name)

    const contacts = await Contact.findOne({ _id: id });

    if (!contacts) {
        res.status(404);
        throw new Error("Contact Not Found!!!");
    }

    res.status(200).json({ message: `Fetched Contact with ID: ${id}`, contact: contacts });
});

/**
 * @description Update a single contact with specific ID
 * @route PUT -> /api/contact/:id
 * @access public
*/
// Update the Single Document in the Collection which has the /api/contact/:id ---> id
const updateUserByID = asyncHandler(async (req, res) => {

    const { id } = req.params

    const contacts = await Contact.findOne({ _id: id });

    if (!contacts) {
        res.status(404);
        throw new Error("Contact Not Found!!!");
    }

    const updatedContact = await Contact.findOneAndUpdate(
        { _id: id },   // Filter / Condition ---> to get the relevant data with this given pointer , this will actually point to this filter in the collection.
        { $set: req.body },    // Update ----> use the Document Query methods or Array Query methods to do relevant modification / updation of data
        { new: true },  // Should return the new Document after Updation is done.
    )

    res.status(200).json({ message: `Updated Contact with ID: ${id}`, contact: updatedContact });
});

/**
 * @description Delete a single contact with specific ID
 * @route DELETE -> /api/contact/:id
 * @access public
*/
// Delete the Single Document in the Collection which has the /api/contact/:id ---> id
const deleteUserByID = asyncHandler(async (req, res) => {

    const { id } = req.params

    const contacts = await Contact.findOne({ _id: id });

    if (!contacts) {
        res.status(404);
        throw new Error("Contact Not Found!!!");
    }

    const deletedContact = await Contact.findOneAndRemove(
        { _id: id }    // Deletion Filter
    )

    res.status(200).json({ message: `Deleted Contact with ID: ${id}`, contact: deletedContact });
});

// Exports out All the Controllers
module.exports = {
    getAllContacts,
    createContact,
    getUserByID,
    updateUserByID,
    deleteUserByID,
}