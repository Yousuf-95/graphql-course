const userLoader = require('../loaders/userLoader');

const Post = {
    user: async ({authorId}, args, context) => {
        let result = userLoader.load(authorId);
        
        return result;
    }
}

module.exports = {Post};