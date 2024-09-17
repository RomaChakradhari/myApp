import express from "express";
//router object 
const router = express.Router();
import UserModel from "../models/user.js";
import { comparePassword, hashPassword } from "../helper/registerHelper.js";
import jwt from "jsonwebtoken";
import { isAdmin, requireSignIn } from "../middleware/registerMiddleware.js";
import orderModel from "../models/order.js";


//register router 
router.post("/register",async(req,res)=>{
    try {
        const {name , email, password , phone , role, address, que} = req.body;
        //validation
        if(!name){
            return res.send({message:"name is required"})
        }
        if(!email){
            return res.send({message:"email is required"})
        }
        if(!password){
            return res.send({message:"password is required"})
        }
        if(!phone){
            return res.send({message:"phone is required"})
        }
        if(!address){
            return res.send({message:"address is required"})
        }
        if(!que){
            return res.send({message:"Answer is required"})
        }
        
        //check  user
        const existingUser = await UserModel.findOne({email});
        //check user is exist or not
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already register please login",
            })
        };

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const newUser = await new UserModel({name,email,phone,address , password:hashedPassword , que});
        newUser.save();
        res.status(200).send({
            success:true,
            message:"user register successfuly ",
            newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in registration",
            error
        })
    }
});

//login route
router.post("/login",async(req,res)=>{
    try {
        const {email ,password} = req.body
        //validation
        if(!email || !password){
           return res.status(404).send({
            success:false,
            message:"invalid email or password",

           })
        }
        //check user exist or not
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"email is not register"
            })
        }
        //compare password
        const match = await comparePassword(password , user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"invalid password",
            })
        };

        //create token
        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role : user.role,
            },
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
});

//forgot password route
router.post("/forgot-password",async(req,res)=>{
    try {
        const {email , que , newPassword} = req.body;
        if(!email){
            res.status(400).send({message:"email is required"})
        }
        if(!que){
            res.status(400).send({message:"question  is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"newPassword is required"})
        }
        //check email and question
        const user = await UserModel.findOne({email , que});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"wrong email or Answer"
            })
        }
        const hash = await hashPassword(newPassword);
        await UserModel.findByIdAndUpdate(user._id,{password:hash})
        res.status(200).send({
            success:true,
            message:"password Reset Succcessfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500),send({
            success:false,
            message:"somthing went wrong",
            error
        })
    }
})


//test route
router.get("/test",requireSignIn,isAdmin,(req,res)=>{
    console.log("protectes route")
    res.send("protected route")
})

//Protected Route for user
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });


//Protected Route for admin
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
     res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, async(req,res)=>{
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await UserModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
          return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await UserModel.findByIdAndUpdate(
          req.user._id,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"error while updating profile",
            error
        })
    }
});

router.get("/orders",requireSignIn, async(req,res)=>{
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("products","-image").populate("buyer","name")
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting orders",
            error
        })
    }
});

router.get("/All-orders" , requireSignIn , isAdmin , async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        .populate("products","-image")
        .populate("buyer","name");
        
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting orders",
            error
        })
    }
})

//change order status
router.put("/order-status/:orderId", requireSignIn , isAdmin , async(req,res)=>{
    try {
        const {orderId} = req.params;
        const {orderStatus} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId , {orderStatus} , {new:true});
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while updating orders",
            error
        })
    }
})

export default router;