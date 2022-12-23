exports.Query = {
    hello: () => {
        return "World";
    },
    products: (parent, args, {products}) => {
        return products;
    },
    product: (parent, args, {products}) => {
        let {id} = args;
        return products.find((product) => product.id === id);
    },
    categories: (parent, args, {categories}) => {
        return categories;
    },
    category: (parent, { id }, {categories}) => categories.find((category) => category.id === id),
    review: (parent, args, {reviews}) => reviews
}