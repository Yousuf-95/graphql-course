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

            let result = await posts.findOneAndDelete({_id: postId});

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
    }
};

module.exports = { Mutation };