import mongoose from "mongoose";
const {Schema} = mongoose; 

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type:Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type:Schema.Types.ObjectId,
      ref: "User",
    },
    orderStatus: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

/*import mongoose  from "mongoose";
const {Schema} = mongoose;

const  OrderSchema = new mongoose.Schema({
    products:[{
        type:Schema.Types.ObjectId,
        ref:"Product"
    }],
    payment: {},
    buyer:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    orderStatus:{
        type:String,
        default:"Not Process",
        emun:["Not Process", "Processing" ,"Shipped","Deliverd", "Cencel"],
    }
},{timestamps:true})

const Order = mongoose.model(" Order", OrderSchema);

export default Order;*/