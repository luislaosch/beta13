import jwt from 'jsonwebtoken';
import config from '../config';
import User from "../models/User"
import Role from '../models/Role';
import Token from '../models/Token'


export const verifyToken = async (req, res, next)=>{
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({ message: "No token provided" });
    
        // Verificar si el token está revocado
        const revokedToken = await Token.findOne({ token });
        if (revokedToken) {
          return res.status(401).json({ message: "Token revocado. Inicia sesión nuevamente" });
        }
    
        // Verificación JWT
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
    
        // Verificar existencia del usuario
        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });
    
        next();
      } catch (error) {
        // Manejar errores específicos de JWT
        if (error instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ message: "Token expirado" });
        }
        if (error instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({ message: "Token inválido" });
        }
        res.status(500).json({ message: error.message });
      }
}


export const isModerator = async(req, res , next) =>{
    //obtension del usuario
    const user = await User.findById(req.userId);
    console.log(user);
    //obtendion de los roles asigandos a ese usuario
    const roles = await Role.find({_id:{$in: user.roles}});
    console.log(roles);
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
    console.log(user);
    //obtendion de los roles asigandos a ese usuario
    const roles = await Role.find({_id:{$in: user.roles}});
    console.log(roles); 
    for (let i=0;i < roles.length ;i++){
        // if(roles[i].name === "moderator" || "admin"){
        if(roles[i].name === "admin"){       
            next();
            return;
        }
    }
    return res.status(403).json({message:"unauthorized"});
}