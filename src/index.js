const { ApolloServer } = require("apollo-server");
const connect = require("./connect");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const {Profile} = require("./resolvers/Profile");
const { Post } = require("./resolvers/Post");
const { User } = require("./resolvers/User");
const typeDefs = require("./schema");
const posts = require('../models/posts');
const users = require('../models/user');
const profiles = require('../models/profile');
const getUserFromToken = require('./utils/getUserFromToken');

async function main() {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers: {
                Query,
                Mutation,
                Profile,
                Post,
                User
            },
            context: async ({req}) => {
                const token = req.headers.authorization;
                // console.log(token);
                // console.log(getUserFromToken(token))
                const userInfo = await getUserFromToken(token);

                return {
                    posts,
                    users,
                    profiles,
                    userInfo
                }
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