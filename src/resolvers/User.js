const User = {
    posts: async ({id}, args, {userInfo, posts}) => {
        try{
            const isOwnProfile = id === userInfo?.userId;
    
            if(isOwnProfile) {
                return await posts.find({"authorId": id});
            }
            else{
                return await posts.find({ "$and": [ {"authorId": id}, { "publishStatus": true } ]}).lean();
            }
        }
        catch(error){
            console.log(error);
        }
    } 
}

module.exports = {User};