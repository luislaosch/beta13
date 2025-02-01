//importar modelo
import Product from "../models/Product"

export const createProduct = (req, res)=>{
    res.json('crear producto')
    console.log(req.body)
}

export const getProducts = (req, res)=>{
    res.json('ver todos productos')
}

export const getProductById = (req, res)=>{
    res.json('ver producto por id')
}

export const updateProductById = (req, res)=>{
    res.json('actualizar producto por id')
}

export const deleteProductById = (req, res)=>{
    res.json('eliminar producto por id')
}