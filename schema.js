const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    hello: String,
    products(filter: ProductsFilterInput): [Product]!,
    product(id: ID!): Product,
    categories: [Category!]!,
    category(id: ID!): Category
    review: [Review]
  }

  type Mutation {
    addCategory(input: AddCategoryInput): Category!
    addProduct(input: AddProductInput): Product!
    addReview(input: AddReviewInput): Review!
    deleteCategory(id: ID!): Boolean
    deleteProduct(id: ID!): Boolean
    deleteReview(id: ID!): Boolean
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
      reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
      description: String!
      quantity: Int!
      image: String!
      price: Float!
      onSale: Boolean!
      categoryId: ID!
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }
`