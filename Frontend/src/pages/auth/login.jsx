import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./auth.css"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
 
export default function Login(){
    const [formData , setFormData] = useState({
        email:"",
        password:"",
    });

    const [auth , setAuth] = useAuth()

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
            const res = await axios.post('http://localhost:8080/api/auth/login',formData);
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token:res.data.token,
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state ||"/")
                
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
                        <h1>Sign - In</h1>
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
                        <button className="sign_btn" onClick={handleSubmit}>Continue</button>
                        <div className="forgetPassword">
                            <p onClick={()=>{navigate("/forgot-password")}}>forgot Passsword ?</p>   
                        </div>
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