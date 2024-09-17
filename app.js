import express from "express"
const app = express();
import dotenv from "dotenv";
//config env file
dotenv.config();
import "./config/db.js"
import registerRoute from "./routes/register.js" // authemtication k liye hai so /auth use kiye
import categoryRoute from "./routes/categoryRoute.js"
import producRoute from "./routes/productRoute.js"
import cors from "cors";
import path from "path"
import { fileURLToPath } from "url";

const __filename  = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,"./Frontend/dist")));

//routes
app.use("/api/auth",registerRoute);
app.use("/api/category",categoryRoute);
app.use("/api/product",producRoute)

app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Frontend/dist/index.html"));
})

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});