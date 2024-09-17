import mongoose from "mongoose";
import dotenv from "dotenv";
//config env file
dotenv.config();

const mongodbURL = process.env.MONGOURL;

main().then((res)=>{
    console.log("connection successful to DB");
})
.catch(err => console.log(err));

async function main() {
  //await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
  await mongoose.connect(mongodbURL);
};
