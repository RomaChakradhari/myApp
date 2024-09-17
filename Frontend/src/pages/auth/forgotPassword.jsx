import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./auth.css"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
 

export default function ForgotPassword(){
    const [formData , setFormData] = useState({
        email:"",
        newPassword:"",
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
    const location = useLocation();
    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log(formData)
        try {
            const res = await axios.post('http://localhost:8080/api/auth/forgot-password',formData);
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate(location.state ||"/login")
                
            }else{
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    }
     
    return(
        <Layout title={"ForgotPassword-EcommerceApp"}>
        
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="logo" />
                </div>

                <div className="sign_form">
                    <form method="post">
                        <h1>Reset-Password</h1>
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
                            <label htmlFor="password" className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={inputChange}
                                required
                            />
                        </div>

                        <div className="form_data">
                            <label htmlFor="que" className="form-label">Your BestFriend Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="que"
                                name="que"
                                value={formData.que}
                                onChange={inputChange}
                                required
                            />
                        </div>
                        <button className="sign_btn" onClick={handleSubmit}>Continue</button>
                        
                    </form>
                </div>
                <div className="createAc">
                    <p>New to Amazon ?</p>
                     <NavLink to="/register">
                        <button>Create Your Amazon Account</button>
                     </NavLink>
                </div>
            </div>
           
        </Layout>
    )
}