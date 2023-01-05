const Post = {
    user: async ({authorId}, args, {users}) => {
        let result = await users.findOne({"_id": authorId});

        return result;
    }
}

module.exports = {Post};