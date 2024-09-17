import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./pages.css"

export default function SingleCategoryPage(){
    const [products , setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();

    const getProductByCat = async()=>{
        try {
            const {data} = await axios.get(`http://localhost:8080/api/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(params?.slug) getProductByCat();
    },[params?.slug])
    return(
        <Layout>
            <h4 style={{textAlign:"center", marginTop:"1rem"}}>Category name : {category?.name}</h4>
            <h6 style={{textAlign:"center"}}>Based on catecogy {products?.length} Products found</h6>

            <div className="d-flex flex-wrap row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 homepage">
                    {products?.map(p=>(
                        <NavLink to={`/product/${p.slug}`} style={{textDecoration:"none", textAlign:"center"}} key={p._id}>
                            <div className="card m-2" style={{width: '15rem', }}>
                                <img src={`http://localhost:8080/api/product/product-image/${p._id}`} 
                                    className="card-img-top" alt="..." />
                                <div className="card-body card-name-price">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.desc.substring(0,20)}...</p>
                                    <p className="card-text" style={{lineHeight:"1px",color:"green",fontWeight:500}}>₹{p.price}/-</p>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                    </div>
        </Layout>
    )
}