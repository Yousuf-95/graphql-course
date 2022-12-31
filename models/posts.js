const mongoose = require("mongoose");

const posts = mongoose.Schema({
    title: String,
    content: String,
    publishStatus: Boolean,
    authorId: String,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model("posts", posts);