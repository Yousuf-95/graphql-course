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
    profile: async (parent, {email}, {profiles, users, userInfo}) => {
        try{
            let profile = await profiles.findOne({"email": email}).lean();
    
            const user =  userInfo ? await users.findOne({"_id": userInfo?.userId}) : "";
    
            const isMyProfile = email === user?.email;
    
            if(!profile) {
                return null;
            }
    
            return {
                id: profile._id,
                ...profile,
                isMyProfile
            };
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = {Query};