const { categories, products } = require("../data");

exports.Query = {
    hello: () => {
        return "World";
    },
    products: () => {
        return products;
    },
    categories: () => {
        return categories;
    },
    category: (parent, { id }, context) => categories.find((category) => category.id === id)
}