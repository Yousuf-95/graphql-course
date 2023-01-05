const Profile = {
    user: async ({email}, args, {users}) => {
        let result = await users.findOne({"email": email});

        return result;
    }
}

module.exports = {Profile};