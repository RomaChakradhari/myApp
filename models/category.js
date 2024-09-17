import mongoose  from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    slug:{
        type:String,
        lowercase:true
    },
})

const Category = mongoose.model("Category",categorySchema);

export default Category;