import React, { useState , useEffect} from 'react'
import AdminMenu from '../../components/Layout/adminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';
const {Option} = Select;

const AdminOrderManage = () => {
    const [status , setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"]);
    const [changeStatus , setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/auth/All-orders");
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (auth?.token) getOrders();
    }, [auth?.token]);

    const HandleChangeStatus = async(orderId, value)=>{
        try {
            const {data} = await axios.put(`http://localhost:8080/api/auth/order-status/${orderId}`,{orderStatus:value});
            getOrders();
            setChangeStatus(data);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
       <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Orders</h1>
                    {
                        orders?.map((order ,idx)=>{
                            return(
                                <div className="border">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                < th scope="col">Status</ th>
                                                < th scope="col">Buyer</ th>
                                                < th scope="col">Date</ th>
                                                < th scope="col">Payment</ th>
                                                < th scope="col">Quantity</ th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    <Select variant="borderless" onChange={(value)=>HandleChangeStatus(order._id,value)} defaultValue={order?.orderStatus}>
                                                        
                                                        {status.map((s,i)=>(
                                                            <Option key={i} value={s}>{s}</Option>
                                                        ))}
                                                    </Select>
                                                </td>
                                                <td>{order?.buyer?.name}</td>
                                                <td>{moment(order?.createdAt).fromNow()}</td>
                                                <td>{order?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{order?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                        </table>
                                        <div className="d-flex flex-wrap row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 m-4">
                                        {order?.products?.map((p,indx)=>(
                                            <div className="card m-2 d-flex" style={{width: '15rem', }}>
                                                <img src={`http://localhost:8080/api/product/product-image/${p._id}`} 
                                                    className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{p.name}</h5>
                                                    <p className="card-text">{p.desc.substring(0,20)}...</p>
                                                    <p className="card-text" style={{lineHeight:"1px"}}>₹{p.price}/-</p>
                                                </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                            )
                            })
                        }
                        
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default AdminOrderManage;