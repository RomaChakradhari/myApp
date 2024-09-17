import express from "express";
import { isAdmin, requireSignIn } from "../middleware/registerMiddleware.js";
import ExpressFormidable from "express-formidable";
import fs from "fs"; //file system ye package expressFormidable k sath automatic install aata hai
import Product from "../models/product.js";
import slugify from "slugify";
import Category from "../models/category.js"
import braintree from "braintree";
import Order from "../models/order.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

//contoller me  payment gatway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey:  process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//create product routes
router.post("/create-product",requireSignIn,isAdmin ,ExpressFormidable(), async(req,res)=>{
     try {
        const {name , quantity , price , desc, category } = req.fields;
        const {image} = req.files; // req.body k jagah . fields aur .files likhenge

        //validation
        switch(true){
            case !name:
                res.status(500).send({error:"name is required"})
            case !quantity:
                res.status(500).send({error:"quantity is required"})
            case !price:
                 res.status(500).send({error:"price is required"})
            case !desc:
                res.status(500).send({error:"desc is required"})
            case !category:
              res.status(500).send({error:"category is required"})
            //case !shipping:
               // res.status(500).send({error:"shipping is required"})
            case image && image.size >1000000 :
                res.status(500).send({error:"image is required"})
        }

        //create new product
        const products = new Product({...req.fields , slug:slugify(name)});
        if(image){
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product created successfully",
            products,
        })
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"product creation failed",
            error,
        })
     }

})


//get All products
router.get("/get-product",async(req,res)=>{
    try {
        const products = await Product.find({}).populate("category").select("-image").limit(12).sort({createdAt:-1})
        res.status(201).send({
            success:true,
            totalProduct :products.length,
            message:"All products",
            products,

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while geting products",
            error,
        })
    }
})

//show single Product
router.get("/get-product/:slug",async(req,res)=>{
    try {
        
      const product = await Product
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");

        res.status(201).send({
            success:true,
            message:"single product fetched",
            product,

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while geting single product",
            error,
        })
    }
});;

//get image
router.get("/product-image/:pId",async(req,res)=>{
    try {
      const product = await Product.findById(req.params.pId).select("image");
      if (product.image.data) {
        res.set("Content-type", product.image.contentType);
        return res.status(200).send(product.image.data);
      }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while geting image",
            error,
        })
    }
});

//update product route
router.put("/update-product/:pid", requireSignIn , isAdmin,ExpressFormidable(), async (req, res) => {
    try {
      const { name , desc, price, category, quantity, shipping } =
        req.fields;
      const { image } = req.files;
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !desc:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case image && image.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await Product.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (image) {
        products.image.data = fs.readFileSync(image.path);
        products.image.contentType = image.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  })

//delete Product route
router.delete("/product-delete/:pId",requireSignIn, isAdmin ,async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.pId).select("-image");
        res.status(201).send({
            success:true,
            message:"product deleted successfully",
           

        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error while deleting product",
            error,
        })
    }
})

//filter product
router.post("/product-filter", async(req,res)=>{
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message:"error while filtering products",
      error
    })
  }
});

//count product
router.get("/product-count",async(req,res)=>{
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message:"error in product count",
      error
    })
  }
});

//product list based on page
router.get("/product-list/:page",async(req,res)=>{
  try {
    const perPage = 4
    const page = req.params ? req.params.page : 1
    const products = await Product
    .find({})
    .select("-image")
    .skip((page-1)* perPage)
    .limit(perPage)
    .sort({createdAt:-1})
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success:false,
      message:"error in product list",
      error
    })
  }
});

//search product
router.get("/search/:keyword",async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await Product
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { desc: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-image");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
});

//similar product route

router.get("/similar-product/:pid/:cid",async(req,res)=>{
  try {
    const { pid, cid } = req.params;
    const products = await Product
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-image")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error while getting similar product",
      error,
    });
  }
})

//category wise show product
router.get("/product-category/:slug",async(req,res)=>{
  try {
    const category = await Category.findOne({slug:req.params.slug});
    const products = await Product.find({category}).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error while getting categori wise product",
      error,
    });
  }
});

//payment route

//get token from braintree
router.get("/braintree/token",async(req,res)=>{
  try {
    gateway.clientToken.generate({}, function(err, responce){
      if(err){
        res.status(500).send(err)
      }else{
        res.send(responce)
      }
    }
  )
  } catch (error) {
    console.log(error)
  }
});

//payment 
router.post("/braintree/payment" , requireSignIn , async(req,res)=>{
  try {
    const { nonce, card } = req.body;
    const totalPrice = card
    .map(p => Number(p.price))  // Convert price to number
    .reduce((sum, price) => sum + price, 0);  // Calculate total
    //console.log("card error =>>>>>>>>>>",card)
    let newTransaction = gateway.transaction.sale(
      {
        amount: totalPrice,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
       
      async (error, result)=> {
        if (result) {
          const order = new Order({
            products: card,
            payment: result,
            buyer:req.user._id,
          })
          await order.save();
          //console.log( "order =>>>>>>>>>>>>",order)
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});


export default router;