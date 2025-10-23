import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
       Name:{
        type:String,
        required:true,
        trim:true
    },
    Unit:{
        type:String,
        required:true,
    },
    Rate:{
        type:Number,
        required:true,
    },
    Quantity:{
        type:Number,
        required:true,
    }
},{
    timestamps:true,
})
const Item = mongoose.model("Item",itemSchema);

export default Item;