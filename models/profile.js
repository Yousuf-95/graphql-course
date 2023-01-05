const mongoose = require("mongoose");

const profiles = mongoose.Schema({
    email: String,
    bio: String,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model("profiles", profiles);