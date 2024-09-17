import { Link } from "react-router-dom"
import Layout from "../components/Layout/Layout";
import "./pages.css";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import EmailIcon from '@mui/icons-material/Email';


export default function Contact(){
    return(
        <Layout title="Contact-Ecommerce">
            <div className="contact-container">
                <div className="img">
                    <img src="/contactus.jpeg" alt="img" />
                </div>
                <div className="contact-Details">
                    <h3>CONTACT US</h3>
                    <p className="des">Any query and information about product feels free to call anytime , we 24*7 available</p>
                    <p><EmailIcon/> : <Link to="#">www.help@ecommerceApp.com</Link></p>
                    <p><AddIcCallIcon/> : 012-3456789</p>
                    <p><HeadsetMicIcon/>:  1800-0000-0000 (toll free)</p>

                </div>
            </div>
        </Layout>
    )
}