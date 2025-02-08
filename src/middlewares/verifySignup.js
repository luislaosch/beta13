import User from "../models/User";
import Role from "../models/Role";
//verificar si el rol existe
export const checkRoleExisted = async(req, res, next)=>{
 
    // const allRoles = await Role.find();
    // const roleNames = allRoles.map(role => role.name);
    // const broles = await req.body.roles; 
    // res.json({broles});
    // console.log(broles,roleNames)
    
    try {
        if(req.body.roles){
            const allRoles = await Role.find();
            const allRoleNames = allRoles.map(role => role.name);
            for (let i=0; i < req.body.roles.length;i++){
                if(!allRoleNames.includes(req.body.roles[i])){
                    return res.status(400).json({message: `Role ${req.body.roles[i]} not exist`})
                }
            }
        }
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//verificar si el usuario existe
export const checkUsernameExisted = async(req, res , next)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        if(user) return res.status(400).json({message:"username is already in use"});
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// verificar si el email existe
export const checkEmailExisted = async(req, res , next)=>{
    try {
        const email = await User.findOne({email: req.body.email})
        if(email) return res.status(400).json({message:"email is already in use"});
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



