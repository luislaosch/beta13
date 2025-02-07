import jwt from 'jsonwebtoken';
import config from '../config';
import User from "../models/User"
import Role from '../models/Role';


export const verifyToken = async (req, res, next)=>{
    try {
        //capturamos el token que esta en la cabecera de la peticion
    const token = req.headers["access-token"];
    //verificando si existe un token 
    if(!token) return res.status(403).json({message:"No token provided"})
    //Si el token existe se almacena en una variable
    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.id;

    // const user = await User.finById(decoded.id);
    const user = await User.findById(req.userId,{password:0});
    console.log(user);
    if(!user) return res.status(404).json({message: "no user found"})
    next()
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const isModerator = async(req, res , next) =>{
    //obtension del usuario
    const user = await User.findById(req.userId);
    //obtendion de los roles asigandos a ese usuario
    const roles = await Role.find({_id:{$in: user.roles}});
    
    for (let i=0;i < roles.length ;i++){
        if(roles[i].name === "moderator" || "admin"){
        // if(roles[i].name === "moderator"){
            next();
            return;
        }
    }
    return res.status(403).json({message:"unauthorized"});
}

export const isAdmin = async(req, res , next) =>{
    //obtension del usuario
    const user = await User.findById(req.userId);
    //obtendion de los roles asigandos a ese usuario
    const roles = await Role.find({_id:{$in: user.roles}});
     
    for (let i=0;i < roles.length ;i++){
        // if(roles[i].name === "moderator" || "admin"){
        if(roles[i].name === "admin"){       
            next();
            return;
        }
    }
    return res.status(403).json({message:"unauthorized"});
}