import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        unique:true
    }
},{
    timestamps:true,
    versionKey: false
})

export default model('CategoryProduct', categorySchema)