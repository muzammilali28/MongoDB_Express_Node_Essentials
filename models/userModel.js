const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Name field is required"]
    },
    email:{
        type: String,
        required: [true, "Email field is required"],
        unique: [true, "Email address already taken"]
    },
    password:{
        type: String,
        required: [true, "Phone field is required"]
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);