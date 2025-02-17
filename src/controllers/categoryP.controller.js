//importar modelo
import CategoryProduct from "../models/CategoryProduct"

export const createCategory = async(req, res)=>{
    try {
        const {name}= req.body
        const newCategory = new CategoryProduct({name});
        if(!newCategory)return res.status(404).json({message:"incomplete or invalid data"});
        const CategorySave =await newCategory.save();
        res.status(201).json(CategorySave);
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
}

export const getCategory = async(req, res)=>{
    try {
        const Category = await CategoryProduct.find();
        if(!Category || Category.length === 0)return res.status(404).json({message:"no registered"});
        res.json(Category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}

export const getCategoryById = async(req, res)=>{
    try {
        const CategoryById = await CategoryProduct.findById(req.params.categoryId);
        if(!CategoryById )return res.status(404).json({message:"no registered "});
        res.status(200).json(CategoryById);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateCategoryById = async (req, res)=>{
    try {
        const updateCategory = await CategoryProduct.findByIdAndUpdate(req.params.categoryId,req.body,{new:true});
        if(!updateCategory )return res.status(404).json({message:"no registered "});
        res.status(200).json(updateCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteCategoryById = async(req, res)=>{
    try {
        const deleteCategoryById = await CategoryProduct.findByIdAndDelete(req.params.categoryId);
        if(!deleteCategoryById )return res.status(404).json({message:"no registered "});
        res.status(200).json(deleteCategoryById);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}