import { Routes, Route } from "react-router-dom"
import Homepage from "./pages/homepage"
import About from "./pages/About"
import Contact from "./pages/contact"
import Policy from "./pages/Poilicy"
import PageNotFount from "./pages/PagenotFound"
import Register from "./pages/auth/register"
import Login from "./pages/auth/login"
import Dashboard from "./pages/user/dashboard"
import PrivateRoute from "./components/Routes/privateRoute"
import ForgotPassword from "./pages/auth/forgotPassword"
import AdminPrivateRoute from "./components/Routes/AdminProtectedRoute"
import AdminDashboard from "./pages/Admin/adminDashboard"
import CreateCategory from "./pages/Admin/createCategory"
import CreateProduct from "./pages/Admin/createProduct"
import Users from "./pages/Admin/Users"
import Profile from "./pages/user/Profile"
import Orders from "./pages/user/orders"
import AllProducts from "./pages/Admin/AllProducts"
import ProductUpdate from "./pages/Admin/ProductShowAndUpdate"
import SearchPage from "./pages/searchPage"
import ProductDetails from "./pages/ProductDetails"
import CategoriesPage from "./pages/allcategoriespage"
import SingleCategoryPage from "./pages/singleCategoryPage"
import AddToCardPage from "./pages/cart/AddtoCartPage"
import Payment from "./pages/cart/payment"
import AdminOrderManage from "./pages/Admin/adminOrderMAnage"
 
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/Product/:slug" element={<ProductDetails/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/categories" element={<CategoriesPage/>} />
        <Route path="/category/:slug" element={<SingleCategoryPage/>} />
        <Route path="/cart" element={<AddToCardPage/>} />
        <Route path="/payment" element={<Payment/>} />

        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard/>}/>
          <Route path="user/profile" element={<Profile/>}/>
          <Route path="user/orders" element={<Orders/>}/>
        </Route> 

        <Route path="/dashboard" element={<AdminPrivateRoute/>}>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/create-product" element={<CreateProduct/>}/>
          <Route path="admin/product/:slug" element={<ProductUpdate/>}/>
          <Route path="admin/products" element={<AllProducts/>}/>
          <Route path="admin/order" element={<AdminOrderManage/>}/>
          <Route path="admin/users" element={<Users/>}/>
        </Route>

        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/privacy" element={<Policy/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="*" element={<PageNotFount/>}/>
      </Routes>
    </>
  )
}

export default App
