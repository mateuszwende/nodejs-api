'use strict';

const Product = require('../../../db/models/Product');

const httpMessages = {
    onValidationError: {
        success: false,
        message: 'Please fill required fields.'
    },
    onProductSaveError: {
        success: false,
        message: 'Something went went wrong. Try again.'
    },
    onProductSaveSuccess: {
        success: true,
        message: 'Successfully added new product.'
    },
    onProductRemoveError: {
        success: false,
        message: 'This product doesn\'t exist.'
    },
    onProductRemoveSuccess: {
        success: true,
        message: 'Successfully removed product.'
    },
    onProductUpdateError: {
        success: false,
        message: 'This product doesn\'t exist.'
    },
    onProductUpdateSuccess: {
        success: true,
        message: 'Successfully updated product.'
    },
}

async function addProduct(req, res) {

    try {
        const { name, description, price, type, end_time } = req.body;
        const newProduct = new Product({
            name,
            description, 
            price, 
            type,
            end_time
        });
    
        await newProduct.save();
        return res.status(201).json(httpMessages.onProductSaveSuccess);
    } catch(err) {
        console.log(err);
        return res.status(500).json({err: err.errors.name.message});
    }
    
}

async function removeProduct(req, res) {

    try {
        const { id } = req.body;
        await Product.deleteOne({ _id: id });
        return res.status(201).json(httpMessages.onProductRemoveSuccess);
    } catch(err) {
        console.log(err);
        return res.status(500).json(httpMessages.onProductRemoveError);
    }
}

async function updateProduct(req, res) {

    try {
        const { id, name, description, price, type, end_time } = req.body;

        await Product.updateOne({ _id: id }, { name, description, price, type, end_time }, { runValidators: true });

        return res.status(201).json(httpMessages.onProductUpdateSuccess);  
    } catch(err) {
        console.log('====================================');
        console.log("ERROR", err);
        console.log('====================================');
        return res.status(500).json(err.errors.name.message);
    }
}

module.exports = {
    addProduct,
    removeProduct,
    updateProduct
}