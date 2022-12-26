const  { v4: uuid} = require('uuid');

exports.Mutation = {
    addCategory: (parent, {input}, {db}) => {
        const {name} = input;

        const newCategory = {
            id: uuid(),
            name,
        };
        
        db.categories.push(newCategory);
    
        return newCategory;
    },
    addProduct: (parent, {input}, {db}) => {

        const newProduct = {
            id: uuid(),
            ...input,
        }

        db.products.push(newProduct);

        return newProduct
    },
    addReview: (parent, {input}, {db}) => {

        const newReview = {
            id: uuid(),
            ...input
        }

        db.reviews.push(newReview);

        return newReview;
    },
    deleteCategory: (parent, {id}, {db}) => {
        db.categories = db.categories.filter((category) => category.id !== id);
        return true;
    },
    deleteProduct: (parent, {id}, {db}) => {
        db.products = db.products.filter((product) => product.id !== id);
        db.reviews = db.reviews.filter((review) => review.productId !== id);
        return true;
    },
    deleteReview: (parent, {id}, {db}) => {
        db.reviews = db.reviews.filter((review) => review.id !== id);

        return true;
    }

}