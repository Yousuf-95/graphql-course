const {ApolloServer} = require('apollo-server');
// const {products, categories, reviews} = require('./data');
const {db} = require('./data');
const { Product } = require('./resolvers/Product');
const { Category } = require('./resolvers/Category');
const { Query } = require('./resolvers/Query');
const { Mutation } = require('./resolvers/Mutation');
const {typeDefs} = require('./schema');
const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Category,
        Product,
    },
    context: {
        db
    }
});

server.listen().then(({url}) => {
    console.log("Server is ready at: " + url);
});