const User = {
    posts: async ({id}, args, {userInfo, posts}) => {
        const isOwnProfile = id === userInfo?.userId;

        if(isOwnProfile) {
            return posts.find({"authodId": id});
        }
        else{
            return posts.find({ "$and": [ {"authorId": authodId}, { "publishStatus": true } ]});
        }

        // let result = await posts.find({"authorId": id});

        // return result;
    } 
}

module.exports = {User};