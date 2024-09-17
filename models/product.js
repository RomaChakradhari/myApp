import mongoose from "mongoose";
 

const productSchema = new mongoose.Schema({
     
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category", //category model ke model ka naam
         
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String,
    },
    shipping:{
        type:Boolean,
    },
},{timestamps:true})

const Product = mongoose.model("Product",productSchema);

export default Product