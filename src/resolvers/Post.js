const userLoader = require('../loaders/userLoader');

const Post = {
    user: async (parent, args, context) => {
        try{
            console.log(parent);
            const { authorId} = parent;
            // console.log(authorId);
            let result = userLoader.load(authorId);
            
            return result;
        }
        catch(error) {
            console.log("inside Post.js")
            console.log(error);
        }
    }
}

module.exports = {Post};