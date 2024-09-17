import express from "express"
import { isAdmin, requireSignIn } from "../middleware/registerMiddleware.js";
import CategoryModel from "../models/category.js";
import slugify from "slugify";

const router = express.Router();

//create category route
router.post("/create-category", requireSignIn , isAdmin, async(req,res)=>{
    try {
        const {name } = req.body;
        if(!name){
            return res.status(401).send({message:"name is required"})
        }
        //check existing category ak naam se 2 category na ho
        const existingCategory  = await CategoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category already exist",
            })
        }
        //category exist nhi hai hai save kra denge
        const newCategory = await new CategoryModel({name,slug:slugify(name)});
        newCategory.save();
        res.status(201).send({
            success:true,
            message:"New Category Created",
            newCategory,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in category",
            error
        })
    }
})

//update category
router.put("/update-category/:id", requireSignIn,isAdmin,async(req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while updating category",
            error,
        })
    }
});

//get all category
router.get("/get-categories",async(req,res)=>{
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All category list",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting all categoris",
            error,
        })
    }
});

//show single category

router.get("/show-category/:slug",async(req,res)=>{
    try {
        const {slug} = req.params;
        const category = await CategoryModel.findOne(slug);
        res.status(200).send({
            success:true,
            message:"get single category successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting single categoris",
            error,
        })
    }
})

//delete category route 

router.delete("/delete-category/:id", requireSignIn,isAdmin, async(req,res)=>{
     try {
        const {id} = req.params;
        await CategoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category deleted successfully",
        });
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while deleting category",
            error,
        })
     }
})


export default router;