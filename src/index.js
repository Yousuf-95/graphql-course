const { ApolloServer } = require("apollo-server");
const connect = require("./connect");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const typeDefs = require("./schema");
const posts = require('../models/posts');
const users = require('../models/user');
const profiles = require('../models/profile');



async function main() {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers: {
                Query,
                Mutation
            },
            context: {
                posts,
                users,
                profiles,
            }
        });

        await connect();

        server.listen().then(({ url }) => {
            console.log("Server running on ", url);
        });
    }
    catch (error) {
        console.log(error);
    }
}

main();