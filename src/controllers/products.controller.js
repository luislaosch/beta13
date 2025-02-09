//importar modelo
import Product from "../models/Product"

export const createProduct = async(req, res)=>{
    try {
        const {name, category,price,imgURL}= req.body
        const newProduct = new Product({name, category,price,imgURL});
        if(!newProduct)return res.status(404).json({message:"incomplete or invalid data"});
        const productSave =await newProduct.save();
        res.status(201).json(productSave);
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
}

export const getProducts = async(req, res)=>{
    try {
        const products = await Product.find();
        if(!products || products.length === 0)return res.status(404).json({message:"no registered products"});
        res.json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}

export const getProductById = async(req, res)=>{
    try {
        const productById = await Product.findById(req.params.productId);
        if(!productById )return res.status(404).json({message:"no registered product"});
        res.status(200).json(productById);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateProductById = async (req, res)=>{
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.productId,req.body,{new:true});
        if(!updateProduct )return res.status(404).json({message:"no registered product"});
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteProductById = async(req, res)=>{
    try {
        const deleteProductById = await Product.findByIdAndDelete(req.params.productId);
        if(!deleteProductById )return res.status(404).json({message:"no registered product"});
        res.status(200).json(deleteProductById);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}