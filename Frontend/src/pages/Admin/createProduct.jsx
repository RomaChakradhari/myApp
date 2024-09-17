import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/adminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate} from "react-router-dom";

const {Option} = Select;

export default function CreateProduct(){
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
     
    const navigate = useNavigate();
    // handle submit the product creation form
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append("name", name);
          productData.append("desc", desc);
          productData.append("price", price);
          productData.append("quantity", quantity);
          productData.append("image", image);
          productData.append("category", category);
          const { data } = axios.post(
            "http://localhost:8080/api/product/create-product",
            productData
          );
          if (data?.success) {
            toast.error(data?.message);
          } else {
            toast.success("Product Created Successfully");
            navigate("/dashboard/admin/products");
          }
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      };

    //get all category
    const getAllCategory = async()=>{
        try {
            const res = await axios.get("http://localhost:8080/api/category/get-categories");
            if(res && res?.data.success){
                setCategories(res?.data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("error while getting category");
        }
    }
    useEffect(()=>{
        getAllCategory();
    },[])
    return(
        <Layout title={"Create-Products"}>
            <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3"><AdminMenu/></div>

                <div className="col-md-9">
                    <h2>Create Product</h2>
                    <div className="m-1 w-75">
                        <Select 
                            variant="borderless"
                            placeholder="select category" 
                            size="large" 
                            showSearch 
                            className="form-select mb-3" 
                            onChange={(value)=>{setCategory(value)}}>
                                {
                                    categories?.map(c=>(
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    ))
                                }
                        </Select>
                          
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label btn btn-outline-secondary col-md-12"> 
                                    {image?image.name :"Upload image"} 
                                <input 
                                    type="file" 
                                    name="image" 
                                    id="image" 
                                    accept="image/*" 
                                    onChange={(e)=>setImage(e.target.files[0])}
                                    hidden/>
                                </label>
                            </div>
                            <div className="mb-3">
                                {image && (
                                    <div className="text-center">
                                        <img 
                                            src={URL.createObjectURL(image)} 
                                            alt="image" height={"200px"} 
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name">Product Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    id="name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="desc">Product Description</label>
                                <input
                                    id="desc"
                                    className="form-control"
                                    value={desc}
                                    name="desc"
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    className="form-control"
                                    value={price}
                                    name="price"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="quantity">Quantity of Product</label>
                                <input
                                    id="quantity"
                                    className="form-control"
                                    value={quantity}
                                    name="quantity"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="shipping">Shipping</label>
                                <Select 
                                    variant="borderless"
                                    size="large"
                                    showSearch
                                    className="form-select mb-3 "
                                    onChange={(value)=>{setShipping(value)}}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>

                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>create product</button>
                            </div>
                         
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}