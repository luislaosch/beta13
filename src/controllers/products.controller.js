//importar modelo
import Product from "../models/Product"

export const createProduct = async(req, res)=>{
    try {
        const {name, category,price,imgURL}= req.body
        const newProduct = new Product({name, category,price,imgURL});
        const productSave =await newProduct.save();
        res.status(201).json(productSave);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
   
    
}

export const getProducts = async(req, res)=>{
    const products = await Product.find();
    res.json(products);
}

export const getProductById = async(req, res)=>{
    const productById = await Product.findById(req.params.productId);
    res.status(200).json(productById);
}

export const updateProductById = (req, res)=>{
    res.json('actualizar producto por id')
}

export const deleteProductById = (req, res)=>{
    res.json('eliminar producto por id')
}