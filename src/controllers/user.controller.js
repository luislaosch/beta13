import User from "../models/User";


export const getUsers = async (req, res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserById = async(req, res)=>{
    try {
        const getUserById = await User.findById(req.params.userId);
        res.status(200).json(getUserById);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createUser = async(req, res)=>{
    try {
        const {username, email,password}= req.body
        const newUser = new User({username, email,password:await User.encryptPassword(password)});
        const userSave =await newUser.save();
        res.status(201).json(userSave);
    } catch (error) {
        res.status(500).json({message: error.message});
    } 
    
}

export const updateUserById = async(req, res)=>{
    try {
        const updateUserById = await User.findByIdAndUpdate(req.params.userId,req.body,{new:true});
        res.status(200).json(updateUserById);
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
}

export const deleteUserById = async(req, res)=>{
    try {
        const deleteUserById = await User.findByIdAndDelete(req.params.userId);
        res.status(200).json(deleteUserById);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}