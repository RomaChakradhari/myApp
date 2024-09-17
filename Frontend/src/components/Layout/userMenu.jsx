import { NavLink } from "react-router-dom"

export default function UserMenu(){
    return(
        <>
         <div className="text-center">
         <div className="list-group">
            <h4>Dashboard</h4>
             <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
             <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Total Orders</NavLink>
              
              
         </div> 
         </div>
        </>
    )
}