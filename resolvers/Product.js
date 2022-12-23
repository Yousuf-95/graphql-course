const { categories } = require("../data");

exports.Product = {
    category: (parent, args, context) => {
        let categoryId = parent.categoryId;
        return categories.find((category) => category.id === categoryId)
    }
}