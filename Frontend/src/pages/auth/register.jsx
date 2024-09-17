import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./auth.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";


 
export default function Register(){
    const [formData , setFormData] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        que:"",
    });

    const inputChange= (event)=>{
        setFormData((currdata)=>{
            return {
                ...currdata,
                [event.target.name]:event.target.value
            }
        })
    }
    const navigate = useNavigate();
    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log(formData)
        try {
            const res = await axios.post('http://localhost:8080/api/auth/register',formData);
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login")
                
            }else{
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    }
     
    return(
        <Layout title={"SignUp-EcommerceApp"}>
        
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="logo" />
                </div>

                <div className="sign_form">
                    <form method="post">
                        <h1>Create account</h1>
                        <div className="form_data">
                        <label htmlFor="name" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={inputChange}
                                required
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
                                required
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
                                required
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
                                required
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
                                required
                            />
                        </div>

                        <div className="form_data">
                            <label htmlFor="ques" className="form-label">Your BestFriend name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ques"
                                name="que"
                                value={formData.que}
                                onChange={inputChange}
                                required
                            />
                        </div>
                        
                        <button className="sign_btn" onClick={handleSubmit}>Continue</button>

                        <Divider></Divider>
                        <div className="signIn-info">
                            <p>Already have an account ?</p>
                            <NavLink to="/login">Sign-in</NavLink>
                        </div>
                         
                    </form>
                </div>
            </div>
           
        </Layout>
    )
}