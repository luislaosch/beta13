import { Schema,model } from "mongoose";

const userSchema =new Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique:true
    },
    //relacionando un usuario con varios roles
    roles:[{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},{
    timeseries:true,
    versionKey:false
}) 

export default model ('User',userSchema)