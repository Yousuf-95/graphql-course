const Query = {
    posts: async (parent, args, {posts}) => {
        let result = await posts.find();

        return result;
    } 
}

module.exports = {Query};