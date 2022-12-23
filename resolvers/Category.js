const { products } = require("../data");

exports.Category = {
    products: (parent, args, context) => {
        let id = parent.id;
        return products.filter((product) => product.categoryId === id);
    }
}