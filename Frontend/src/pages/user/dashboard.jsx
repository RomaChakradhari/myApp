import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/userMenu";
import { useAuth } from "../../context/auth";


export default function Dashboard(){
    const [auth , setAuth] = useAuth();
    return(
         <Layout title={"Dashboard-EcommerceApp"}>
            <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3"><UserMenu/></div>

                <div className="col-md-9">
                    <div className="card w-75 p-3 ">
                        <h4>User Name : {auth?.user?.name}</h4>
                        <h4>User Email : {auth?.user?.email}</h4>
                        <h4>User Phone : {auth?.user?.phone}</h4>
                        <h4>User Address : {auth?.user?.address}</h4>
                    </div>
                </div>
            </div>
            </div>
         </Layout>
    )
}