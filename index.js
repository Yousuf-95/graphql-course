const {ApolloServer, gql} = require('apollo-server');
const {products, categories, reviews} = require('./data');

const typeDefs = gql`
    type Query {
        hello: String,
        products: [Product]!,
        categories: [Category!]!,
        category(id: ID!): Category
    }

    type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    categoryId: ID!
    category: Category
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`

const resolvers = {
    Query: {
        hello: () => {
            return "World";
        },
        products: () => {
            return products;
        },
        categories: () => {
            return categories;
        },
        category: (parent, {id}, context) => categories.find((category) => category.id === id)
        
    },
    Category: {
        products: (parent, args, context) => {
            let id = parent.id;
            return products.filter((product) => product.categoryId === id);
        }
    },
    Product: {
        category: (parent, args, context) => {
            let categoryId = parent.categoryId;
            return categories.find((category) => category.id === categoryId)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url}) => {
    console.log("Server is ready at: " + url);
});