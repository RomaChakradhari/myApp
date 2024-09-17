import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/userMenu";
import { useEffect, useState } from "react";
import "../auth/auth.css"
import axios from "axios";
import toast from "react-hot-toast";
import { Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

 

export default function Profile(){
    const [auth , setAuth] = useAuth();
    const [formData , setFormData] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        
    });
    //get user data from auth
    useEffect(()=>{
        const { ...formData} = auth.user;
        setFormData(formData)
    },[auth?.user])
    const inputChange= (event)=>{
        setFormData((currdata)=>{
            return {
                ...currdata,
                [event.target.name]:event.target.value
            }
        })
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log(formData)
        try {
            const {data} = await axios.put('http://localhost:8080/api/auth/profile',formData);
            if(data?.success){
                setAuth({
                    ...auth, user:data?.updatedUser
                })

                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));

                toast.success(data?.message);
            }else{
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        } 
    }
    return(
        <Layout title={"User-Profile"}>
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                    <div className="sign_container">
                <div className="sign_header">
                    <img src="../../blacklogoamazon.png" alt="logo" />
                </div>

                <div className="sign_form">
                    <form method="post">
                        <h1>User Profile</h1>
                        <div className="form_data">
                        <label htmlFor="name" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={inputChange}
                                
                            />
                        </div>

                        <div className="form_data">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={inputChange}
                                disabled
                            
                                
                            />
                        </div>

                        <div className="form_data">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={inputChange}
                                
                            />
                        </div>

                        <div className="form_data">
                            <label htmlFor="phone" className="form-label">Mobile No.</label>
                            <input
                                type="number"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={inputChange}
                               
                            />
                        </div>

                        <div className="form_data">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={inputChange}
                                
                            />
                        </div>

                         
                        
                        <button className="sign_btn" onClick={handleSubmit}>Update</button>

                        <Divider></Divider>
                        <div className="signIn-info">
                            <p>Already have an account ?</p>
                            <NavLink to="/login">Sign-in</NavLink>
                        </div>
                         
                    </form>
                </div>
            </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}