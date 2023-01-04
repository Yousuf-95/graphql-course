const validator = require('validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const Mutation = {
    postCreate: async (parent, { post }, { posts }) => {
        let { title, content } = post;

        if (!title || !content) {
            return {
                userErrors: [{
                    message: "You must provide title and content to create a post"
                }],
                post: null
            }
        }

        let result = await posts.create({
            title,
            content,
            createdAt: Date.now(),
            publishStatus: false,
            authorId: 1,
        });

        return {
            userErrors: [],
            post: result
        };
    },
    postUpdate: async (parent, { postId, post }, { posts }) => {
        try {
            let { title, content } = post;

            if (!title && !content) {
                return {
                    userErrors: [{
                        message: "You must provide title or content to update a post"
                    }],
                    post: null
                }
            }

            let payloadToUpdate = {
                title,
                content,
            }

            if (!title) delete payloadToUpdate.title;
            if (!content) delete payloadToUpdate.content;

            let result = await posts.findOneAndUpdate({ _id: postId }, { ...payloadToUpdate });
            console.log(result);

            return {
                userErrors: [],
                post: result
            }

        }
        catch (error) {
            console.log(error);

            return {
                userErrors: [{
                    message: error.message
                }],
                post: null
            }
        }
    },
    postDelete: async (parent, { postId }, { posts }) => {
        try {
            if (!postId) {
                return {
                    userErrors: [{
                        message: "You must provide postId to delete a post"
                    }],
                    post: null
                }
            }

            let result = await posts.findOneAndDelete({ _id: postId });

            return {
                userErrors: [],
                post: result
            }

        }
        catch (error) {
            console.log(error);

            return {
                userErrors: [{
                    message: error.message
                }],
                post: null
            }
        }
    },
    signup: async (parent, args, { users, profiles }) => {
        try {
            const { credentials, name, bio } = args;
            const {email, password} = credentials;

            const isEmail = validator.isEmail(email);
            const isValidPassword = validator.isLength(password, {
                min: 5
            });

            if (!isEmail || !isValidPassword) {
                return {
                    userErrors: [{
                        message: "Invalid email or password."
                    }],
                    token: null
                }
            }

            if (!name || !bio) {
                return {
                    userErrors: [{
                        message: "Invalid name or bio"
                    }],
                    token: null
                }
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            let user = await users.create({
                name,
                email,
                password: hashedPassword,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });

            await profiles.create({
                bio,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });

            JWT_Signature = "usually a very long string";

            const token = await JWT.sign(
                {
                    userId: user._id
                },
                JWT_Signature,
                {
                    expiresIn: 60000
                });

            return {
                userErrors: [],
                token: token
            }

        }
        catch (error) {
            console.log(error);

            return {
                userErrors: [{
                    message: error.message
                }],
                token: null
            }
        }
    },
    signin: async (parent, args, { users }) => {
        try {
            const { credentials } = args;
            const {email, password} = credentials;

            const isEmail = validator.isEmail(email);
            const isValidPassword = validator.isLength(password, {
                min: 5
            });

            if (!isEmail || !isValidPassword) {
                return {
                    userErrors: [{
                        message: "Invalid email or password."
                    }],
                    token: null
                }
            }

            const user = await users.findOne({email});

            if(!user){
                return {
                    userErrors: [{
                        message: "Invalid email/password combination"
                    }],
                    token: ""
                }
            }
            
            const passwordMatched = await bcrypt.compare(password,user.password);
            
            if(!passwordMatched){
                return {
                    userErrors: [{
                        message: "Invalid email/password combination"
                    }],
                    token: ""
                }
            }
            
            const JWT_Signature = "usually a very long string";

            const token = await JWT.sign(
                {userId: user._id},
                JWT_Signature,
                {expiresIn: 60000});

            return {
                userErrors: [],
                token: token
            }
            
        }
        catch (error) {
            console.log(error);

            return {
                userErrors: [{
                    message: error.message
                }],
                token: null
            }
        }
    }
};

module.exports = { Mutation };