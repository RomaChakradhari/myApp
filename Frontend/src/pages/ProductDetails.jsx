import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./productDetails.css";
//slide
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//import { products } from "./ProductData";
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import { useCard } from "../context/card";
import toast from "react-hot-toast";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,

    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,

    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,

    }
};

export default function ProductDetails(){
    const params = useParams();
    const [product , setProduct] = useState({});
    const [relatedProduct , setRelatedProduct] = useState([]);
    const [card , setCard] = useCard();
    //get Product
    const getSingleProduct = async()=>{
        try {
            const {data} = await axios.get(`http://localhost:8080/api/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProducts(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error)
        }
    }
     
    //get similar product
    const getSimilarProducts = async(pid ,cid)=>{
        try {
            const {data} = await axios.get(`http://localhost:8080/api/product/similar-product/${pid}/${cid}`)
            setRelatedProduct(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(params?.slug) getSingleProduct();
    },[params.slug])
    return(
        <Layout>
             
                <div className="card_container">
                    <div className="left_card">
                        <img src={`http://localhost:8080/api/product/product-image/${product._id}`} alt="img" />
                        <div className="card_btn">
                            
                            <button className="btn1" onClick={()=>{
                                setCard([
                                    ...card,
                                    product
                                ])
                                localStorage.setItem("cart",JSON.stringify([...card , product]))
                                toast.success("product added to cart successfully")
                            }}
                            >Add to Card</button>
                            <button className="btn2">Buy Now</button>
                        </div>
                    </div>

                    <div className="right_card">
                        <h3>{product.name}</h3>
                         
                        <hr></hr>
                        <p>Category :
                            <span style={{ color: "#812704" }}> &nbsp;{product?.category?.name}</span>
                        </p>
                        <p className="mrp">MRP :<span> &nbsp;&#8377;{product.price}/-</span></p>
                    
                        <div className="discount_box">
                            <h4>Free Delivery :
                                <span style={{ color: "#111", fontWeight: "600" }}> &nbsp;Aug 20 :2024</span>  Details
                            </h4>
                            <p>Fastest Delivery :
                                <span style={{ color: "#111", fontWeight: "600" }}> &nbsp;Tomorrow 11AM</span>
                            </p>
                        </div>

                        <p className="desc">About the Item :
                            <span style={{ color: "#565959", fontSize: 14, fontWeight: 500, letterSpacing: .4 }}>
                               &nbsp; {product.desc}
                            </span>
                        </p>

                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    {relatedProduct.length <1 ? (<p style={{textAlign:"center", fontWeight:500, fontSize:"1.5rem" , color:"#007185"}}>No Similar Products Found</p>) :
                    <div className="product-section">
                        <div className="product_deal">
                            <h3>Similar Products</h3>   
                        </div>
                       <hr></hr>
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            draggable={false}
                            swipeable={true}
                            showDots={false}
                            centerMode={true}
                            autoPlay={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                            containerClass="carousel-container"
                            >
                            
                                {relatedProduct.map(p=>(
                                    <NavLink to={`/product/${p.slug}`} style={{textDecoration:"none", color:"#111"}}>
                                        <div className="card m-2"  >
                                            <img src={`http://localhost:8080/api/product/product-image/${p._id}`} 
                                                className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">{p.desc.substring(0,20)}...</p>
                                                <p className="card-text" style={{lineHeight:"1px"}}>₹{p.price}/-</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                           
                        </Carousel>

                    </div>
                    }          
                </div> 
                
        </Layout>
    )
}