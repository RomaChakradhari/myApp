import { useEffect, useState } from "react";
import axios from "axios";


export default function UseCategory(){
    const [categories , setCategories] = useState([]);

    //get categories
    const getCategoris = async()=>{
        try {
            const {data} = await axios.get("http://localhost:8080/api/category/get-categories");
            setCategories(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategoris();
    },[]);

    return categories;
}