const User = {
    posts: async ({id}, args, {userInfo, posts}) => {
        try{
            const isOwnProfile = id === userInfo?.userId;
    
            if(isOwnProfile) {
                return await posts.find({"authorId": id});
            }
            else{
                let post = await posts.find({ "$and": [ {"authorId": id}, { "publishStatus": true } ]}).lean();

                let postsArray = [];
                for(let i = 0; i < post.length; i++) {
                    let currentPost = post[i];

                    currentPost = {
                        id: currentPost._id,
                        ...currentPost
                    }

                    postsArray.push(currentPost);
                }

                return postsArray;
            }
        }
        catch(error){
            console.log(error);
        }
    } 
}

module.exports = {User};