const Query = {
    posts: async (parent, args, {posts}) => {
        let result = await posts.find();

        return result;
    },
    me: async (parent, args, {users, userInfo}) => {

        if(!userInfo) {
            return null;
        }

        let result = await users.findOne({_id: userInfo.userId});

        return result;
    },
    profile: async (parent, {email}, {profiles}) => {
        let result = await profiles.findOne({"email": email});

        return result;
    }
}

module.exports = {Query};