exports.Category = {
    products: (parent, args, context) => {
        let {products} = context;
        let id = parent.id;
        return products.filter((product) => product.categoryId === id);
    }
}