import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";
import UseCategory from "../hooks/useCategory.jsx";
import "./pages.css";

export default function CategoriesPage(){
    const categories = UseCategory();
    return(
        <Layout title={"All Categories"}>
            <div className="container category" style={{ marginTop: "100px" }}>
            <div className="row container">
                {categories.map((c) => (
                <div className="col-md-4 mt-5 mb-3" key={c._id}>
                    <div className="card">
                    <Link to={`/category/${c.slug}`} className="btn cate-btn" >
                        {c.name}
                    </Link>
                    </div>
                </div>
                ))}
            </div>
            </div>
      </Layout>
    )
}