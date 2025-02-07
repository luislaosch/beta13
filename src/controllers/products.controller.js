//importar modelo
import Product from "../models/Product"

export const createProduct = async(req, res)=>{
    try {
        const {username, email,price,imgURL}= req.body
        const newProduct = new Product({name, category,price,imgURL});
        const productSave =await newProduct.save();
        res.status(201).json(productSave);
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
}

export const getProducts = async(req, res)=>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}

export const getProductById = async(req, res)=>{
    try {
        const productById = await Product.findById(req.params.productId);
        res.status(200).json(productById);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateProductById = async (req, res)=>{
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.productId,req.body,{new:true});
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteProductById = async(req, res)=>{
    try {
        const deleteProductById = await Product.findByIdAndDelete(req.params.productId);
        res.status(200).json(deleteProductById);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}