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
    },
    updateCategory: (parent, {id, input}, {db}) => {
        const index = db.categories.findIndex((category) => category.id === id);
        if(index === -1) return null;
        db.categories[index] = {
            ...db.categories[index],
            ...input
        };

        return db.categories[index];
    },
    updateProduct: (parent, {id, input}, {db}) => {
        const index = db.products.findIndex((product) => product.id === id);
        if(index === -1) return null;
        db.products[index] = {
            ...db.products[index],
            ...input
        };

        return db.products[index];
    },
    updateReview: (parent, {id, input}, {db}) => {
        const index = db.reveiews.findIndex((review) => review.id === id);
        if(index === -1) return null;
        db.reveiews[index] = {
            ...db.reveiews[index],
            ...input
        };

        return db.reveiews[index];
    }

}