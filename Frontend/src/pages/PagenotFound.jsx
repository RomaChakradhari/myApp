import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "./pages.css"


export default function PageNotFount(){
    return(
        <Layout title="PageNotFound-Ecommerce">
             <div className="pnf">
                <h1 className="pnf-title">404</h1>
                <h2 className="pnf-heading"> Oops ! Page Not Found</h2>
                <Link to="/">Back to Home</Link>
             </div>
        </Layout>
    )
}