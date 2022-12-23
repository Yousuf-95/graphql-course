const {gql} = require('apollo-server');

exports.typeDefs = gql`
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