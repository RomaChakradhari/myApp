import { NavLink ,Link} from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import Search from "../Form/searchInput";
import UseCategory from "../../hooks/useCategory";
import { useCard } from "../../context/card";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import "./layout.css";

function Header(){
    const [auth , setAuth] = useAuth();
    const [card] = useCard();
    const categories= UseCategory();

    const handelLogout = ()=>{
        setAuth({
            ...auth,
            user:null,
            token:""
        });
        localStorage.removeItem("auth");
        toast.success("Logout successfully")
    }
    return(
        <>
          <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top header" >
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="navbar-brand" >Ecommerce-App</Link>
                    <Search/>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" >Home</NavLink>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to={"/categories"}>
                                    All Categories
                                    </Link>
                                </li>
                                <hr></hr>
                                {categories?.map((c)=>(
                                    <li key={c._id}><Link to={`/category/${c.slug}`} className="dropdown-item">{c.name}</Link></li>
                                ))}
                             </ul>
                        </li>

                        {
                            !auth.user ? (<>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">SignUp</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">SignIn</NavLink>
                                </li>
                            </>) :(
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${
                                                auth?.user?.role === 1 ? "admin" : "user"
                                            }`} 
                                            className="nav-link dash"> Dashboard</NavLink></li>
                                            <li><NavLink onClick={handelLogout} to="/login" className="nav-link dash" >LogOut</NavLink></li>
                                        </ul>
                                    </li>
                                </>
                            )
                        }
                        <li className="nav-item">
                            <NavLink to="/cart" className="nav-link">
                                <Badge badgeContent={card?.length} color="primary">
                                    <ShoppingCartIcon color="white" />
                                </Badge>
                            </NavLink>
                        </li>
                         
                    </ul>
                </div>
            </div>
        </nav>

        </>
    )
};
export default Header;