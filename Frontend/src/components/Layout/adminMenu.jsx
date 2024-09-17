import { NavLink } from "react-router-dom"

export default function AdminMenu(){
    return(
        <>
         <div className="text-center">
         <div className="list-group">
            <h4>Admin Panel</h4>
            <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
            <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Products</NavLink>
            <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
            <NavLink to="/dashboard/admin/order" className="list-group-item list-group-item-action">Orders</NavLink>
            <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
             
              
         </div> 
         </div>
        </>
    )
}