const Mutation = {
    postCreate: async (parent, {title, content}, {posts}) => {
        const post = {
            title,
            content,
            createdAt: Date.now(),
            publishStatus: false,
            authorId: 1,
        }

        let result = await posts.create(post);
        console.log(result);

        return {
            post: result
        };
    }
};

module.exports = {Mutation};