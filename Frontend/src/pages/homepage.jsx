import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import {prices} from '../components/prices.jsx';
import { NavLink } from 'react-router-dom';
import Banner from './Banner.jsx';
import "./pages.css";

function Homepage(){
    const [products , setProducts] = useState([]);
    const [categories , setCategories] = useState([]);
    const [checked , setchecked] = useState([]);
    const [radio , setRadio] = useState([]);
    const [total , setTotal] = useState(0);
    const [page , setPage] = useState(1);
    const [loading , setLoading] = useState(false)

    //get all category
    const getAllCategory = async()=>{
        try {
            const res = await axios.get("http://localhost:8080/api/category/get-categories");
            if(res && res.data.success){
                setCategories(res.data.category)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllCategory();
        getTotal();
    },[])

    //get all product
    const getAllProducts = async()=>{
        try {
            setLoading(true)
            const {data} = await axios.get(`http://localhost:8080/api/product//product-list/${page}`);
            setLoading(false)
            setProducts(data.products)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    //get total count
    const getTotal = async()=>{
        try {
            const res = await axios.get("http://localhost:8080/api/product/product-count");
            setTotal(res?.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    //load more 
    const loadMOre = async(req,res)=>{
        try {
            setLoading(true)
            const {data} = await axios.get(`http://localhost:8080/api/product/product-list/${page}`)
            setLoading(false)
            setProducts(
                [...products, ...data?.products]
            )
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(()=>{
        if(page ===1 ) return;
        loadMOre();
    },[page])
    

    //filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
          all.push(id);
        } else {
          all = all.filter((c) => c !== id);
        }
        setchecked(all);
      };

      useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
      }, [checked.length, radio.length]);
    
      useEffect(() => {
        if (checked.length || radio.length) filterProduct();
      }, [checked, radio]);
    
      //get filterd product
      const filterProduct = async () => {
        try {
          const { data } = await axios.post("http://localhost:8080/api/product/product-filter", {
            checked,
            radio,
          });
          setProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <Layout title={"All Products - Best Offers"}>
            <Banner/>
            <div className="row mt-3 homepage">
                <div className="col-md-2 filter">
                    <h5 className='text-center'> Filter by Category</h5>
                    <div className="d-flex flex-column ms-5">
                    {categories?.map((c) => (
                        <Checkbox
                            key={c._id}
                            onChange={(e) => handleFilter(e.target.checked, c._id)}
                        >
                        {c.name}
                        </Checkbox>
                    ))}
                    </div>

                    <h5 className='text-center mt-4'> Filter by Price</h5>
                    <div className="d-flex flex-column ms-5">
                        <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                            {
                                prices?.map((p)=>(
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))
                            }
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column ms-5 mt-3">
                        <button className='btn btn-danger' onClick={()=>window.location.reload()}>Reset Filters</button>
                    </div>
                </div>
                <div className=" col-md-9">
                    
                    <h1 className='text-center'>All Products</h1>
                    <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 ms-3">
                    {products.map(p=>(
                        <NavLink to={`/product/${p.slug}`} style={{textDecoration:"none", textAlign:"center"}} key={p._id}>
                            <div className="card m-2 " >
                                <img src={`http://localhost:8080/api/product/product-image/${p._id}`} 
                                    className="card-img-top" alt="..." />
                                <div className="card-body card-name-price">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text desc">{p.desc.substring(0,20)}...</p>
                                    <p className="card-text price" style={{lineHeight:"1px", color:"green",fontWeight:500}}>₹{p.price}/-</p>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                    </div>
                    <div className='m-2 p-3'>
                        {
                            products && products.length < total && (
                                <button 
                                    className='btn loadmore' 
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        setPage(page + 1)
                                    }}>
                                    {loading ? "loading..." : "loadMore"}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default Homepage;