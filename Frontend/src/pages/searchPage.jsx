import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

export default function SearchPage(){
    const [values , setValues] = useSearch();
    console.log(values)
    console.log(values.result)
    return(
        <Layout title={"search-result"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search result</h1>
                    <h6>
                        {values?.results.length < 1
                        ? "No Products Found"
                        : `Found ${values?.results.length}`}
                    </h6>
                    <div className="d-flex flex-wrap row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 m-4">     
                    {
                        values.results.map(p=>(
                            <div className="card m-2" style={{width: '15rem',height:"21rem"}}>
                                <img src={`http://localhost:8080/api/product/product-image/${p._id}`} 
                                className="card-img-top" alt="..." style={{height:"18rem"}}/>
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.desc.substring(0,20)}...</p>
                                    <p className="card-text">₹{p.price}/-</p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </Layout>
    )
}