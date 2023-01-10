const userLoader = require('../loaders/userLoader');

const Post = {
    user: async ({authorId}, args, context) => {
        try{
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