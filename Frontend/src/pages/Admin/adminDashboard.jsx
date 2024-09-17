import AdminMenu from "../../components/Layout/adminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

export default function AdminDashboard(){
    const [auth , setAuth] = useAuth();
    return(
        <Layout title={"Admin-Dashboard"}>
            <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3"><AdminMenu/></div>
                <div className="col-md-9">
                    <div className="card w-75 p-3 ">
                        <h4>Admin Name : {auth?.user?.name}</h4>
                        <h4>Admin Email : {auth?.user?.email}</h4>
                        <h4>Admin Mobile No. : {auth?.user?.phone}</h4>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}