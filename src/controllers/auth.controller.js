// import { config } from "dotenv";
import config from "../config";
import User from "../models/User"
import jwt from "jsonwebtoken"

export const signUp = async(req, res)=>{
    try {
        const {username, email, password, roles } = req.body;

        
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        });
        //guardado del usuario nuevo con la contraseña encriptada
        const savedUser = await newUser.save();
        // generar token
        const token = jwt.sign({id:savedUser._id},config.SECRET,{expiresIn:7200});

        res.status(201).json({token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const signIn = async(req, res)=>{
    res.json('sing in')
}


