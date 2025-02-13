// import { config } from "dotenv";
import config from "../config";
import User from "../models/User"
import jwt from "jsonwebtoken"
import Role from '../models/Role'
import  Token  from '../models/Token';
// import { token } from "morgan";

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


// export const logout = async (req, res) => {
//     try {
//         const token = req.headers["x-access-token"];
        
//         if (!token) {
//             return res.status(400).json({ message: "No token provided" });
//         }

//         // Verificar que el token sea válido
//         try {
//             const decoded = jwt.verify(token, config.SECRET);
//             const expiresAt = new Date(decoded.exp * 1000);
//             // Guardar el token en la lista negra
//             // const decodedToken = jwt.decode(token);
//             // const expiresAt = new Date(decodedToken.exp * 1000);
            
//             const invalidToken = new InvalidToken({
//                 token,
//                 expiresAt
//             });
//             await invalidToken.save();
//             console.log('Token guardado en lista negra:', invalidToken);

//             return res.status(200).json({ message: "Logout successful" });
//         } catch (error) {
//             return res.status(401).json({ message: "Invalid token" });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }

export const logout = async (req, res) => {
    try {
        // Extraer el token del header x-access-token
        const token = req.headers["x-access-token"];
        if (!token) {
          return res.status(401).json({ message: "Token no proporcionado" });
        }
    
        // Verificar y decodificar el token
        let decoded;
        try {
          decoded = jwt.verify(token, config.SECRET);
        } catch (error) {
          if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expirado" });
          }
          return res.status(401).json({ message: "Token inválido" });
        }
    
        // Verificar si el token ya está revocado
        const existingToken = await Token.findOne({ token });
        if (existingToken) {
          return res.status(400).json({ message: "Token ya revocado" });
        }
    
        // Registrar el token en la lista negra
        await Token.create({
          token,
          expiresAt: new Date(decoded.exp * 1000) // Convertir a milisegundos
        });
    
        res.status(200).json({ message: "Logout exitoso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
    // try {

    //     const token = req.headers["x-access-token"];
    //     //verificando si existe un token 
    //     console.log("logout");
    //     console.log(token);

    //     // const token = req.headers["x-access-token"];
    //     // console.log('Token recibido:', token);
        
    //     if (!token) {
    //         return res.status(400).json({ message: "No token provided" });
    //     }

    //     try {
    //         const decoded = jwt.verify(token, config.SECRET);
    //         console.log('Token decodificado:', decoded);
            
    //         const expiresAt = new Date(decoded.exp * 1000);
    //         console.log('Fecha de expiración:', expiresAt);

    //         // Intentamos guardar y capturamos el resultado
    //         const savedToken = await InvalidToken.create({
    //             token,
    //             expiresAt
    //         });
            
    //         console.log('Token guardado:', savedToken);

    //         // Verificamos que se guardó correctamente
    //         const verifySaved = await InvalidToken.findOne({ token });
    //         console.log('Verificación de guardado:', verifySaved);

    //         return res.status(200).json({ 
    //             message: "Logout successful",
    //             tokenSaved: savedToken !== null
    //         });
    //     } catch (error) {
    //         console.error('Error al procesar el token:', error);
    //         return res.status(401).json({ 
    //             message: "Invalid token",
    //             error: error.message 
    //         });
    //     }
    // } catch (error) {
    //     console.error('Error en logout:', error);
    //     return res.status(500).json({ 
    //         message: error.message,
    //         error: error.stack 
    //     });
    // }
}