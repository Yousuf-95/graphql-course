const {ApolloServer} = require('apollo-server');
const {products, categories, reviews} = require('./data');
const { Product } = require('./resolvers/Product');
const { Category } = require('./resolvers/Category');
const { Query } = require('./resolvers/Query');
const {typeDefs} = require('./schema');

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Category,
        Product
    }
});

server.listen().then(({url}) => {
    console.log("Server is ready at: " + url);
});