// import { config } from "dotenv";
import config from "../config";
import User from "../models/User"
import jwt from "jsonwebtoken"
import Role from '../models/Role'
import { token } from "morgan";

export const signUp = async(req, res)=>{
    try {
        const {username, email, password, roles } = req.body;     
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        });

        if(roles){
            //busca los roles creados
            const foundRoles = await Role.find({name: {$in: roles}})
            newUser.roles= foundRoles.map(role => role._id)
        }else{
            //si no hay unb role asignado le asigna el rol user
            const role = await Role.findOne({name:"user"})
            newUser.roles = [role._id];
        }
        //guardado del usuario nuevo con la contraseña encriptada
        const savedUser = await newUser.save();
        console.log(savedUser);
        // generar token
        const token = jwt.sign({id:savedUser._id},config.SECRET,{expiresIn:43200});

        res.status(201).json({token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const signIn = async(req, res)=>{
    
    try {
        const userFound = await User.findOne({email: req.body.email}).populate("roles") //.populate para que devuelva todo el objeto
        if(!userFound)return res.status(400).json({message: "user not found"})
    
        const maschPassword = await User.comparePassword(req.body.password, userFound.password)

        if(!maschPassword) return res.status(401).json({token: null, message: 'Invalid password'})
        
        const token = jwt.sign(
            { id: userFound._id, email: userFound.email, username: userFound.username },
            config.SECRET,
            { expiresIn: 43200 }
        );
        res.json({ token, user: { id: userFound._id, email: userFound.email, username: userFound.username } });
        
        // const token = jwt.sign({id:userFound._id},config.SECRET,{expiresIn:43200})
        // res.json({token})
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const logoutUser = async (req, res) => {
    try {
        const { token } = req.body;

        // Eliminar el token de la base de datos
        await Auth.findOneAndDelete({ token });
        await jwt.findOneAndDelete({ token });

        res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};