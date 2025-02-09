import {Schema, model} from "mongoose";

const cartSchema =new Schema(
{
    //registro de usuario
    user:{
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true,
    },
    //registro de productos
    products:[ {
        product: {
            ref: "Product",
            type: Schema.Types.ObjectId,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
      },],
    //monto acumulado
    payAmount:{
        type: Number,
        default: 0,
    },
},
{
    timestamps:true,
    versionKey:false
})

export default model ('Cart',cartSchema)