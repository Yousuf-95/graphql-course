const mongoose = require("mongoose");

const users = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model("users", users);