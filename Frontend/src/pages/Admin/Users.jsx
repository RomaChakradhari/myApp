import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/adminMenu";

export default function Users(){
    return(
        <Layout title={"All-users"}>
            <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3"><AdminMenu/></div>
                <div className="col-md-9">
                    <h2>user</h2>
                </div>
            </div>
            </div>
        </Layout>
    )
}