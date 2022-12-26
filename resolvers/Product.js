exports.Product = {
    category: (parent, args, {db}) => {
        const {categories} = db;
        let categoryId = parent.categoryId;
        return categories.find((category) => category.id === categoryId)
    },
    reviews: ({id}, args, {db}) => {
        return db.reviews.filter((review) => review.productId === id);
    }
}