const Mutation = {
    postCreate: async (parent, {title, content}, {posts}) => {
        const post = {
            title,
            content,
            createdAt: Date.now(),
            publishStatus: false,
            authorId: 1,
        }

        if(!title || !content) {
            return {
                userErrors: [{
                    message: "You must provide title and content to create a post"
                }],
                post: null
            }
        }

        let result = await posts.create(post);
        console.log(result);

        return {
            userErrors: [],
            post: result
        };
    }
};

module.exports = {Mutation};