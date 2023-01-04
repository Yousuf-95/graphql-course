async function canUserMutatePost({userInfo, postId, posts, users}) {
    const user = await users.findOne({"_id": userInfo.userId});

    if(!user) {
        return {
            userErrors: [{
                message: "User not found"
            }],
            post: null
        }
    }

    const post = await posts.findOne({"_id": postId});

    if(post?.authorId !== user.id) {
        return {
            userErrors: [{
                message: "Unauthorized"
            }],
            post: null
        }
    }

}

module.exports = canUserMutatePost;