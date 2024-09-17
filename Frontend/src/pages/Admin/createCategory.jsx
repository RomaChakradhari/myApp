import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/adminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/categoryForm";
import { Button, Modal } from 'antd'; //category update krene k liye reusable component user liye hai antd se
 

export default function CreateCategory(){
    const [categories, setCategories] = useState([])
    const [name , setName] = useState("");
    const [Visible , setVisible] = useState(false);
    const [selected , setSelected] = useState(null);
    const [updatesName , setUpdatedName] = useState("")
    //handle form submit
    const submit = async(e)=>{
        e.preventDefault();
        console.log(name);
        try {
            const res = await axios.post("http://localhost:8080/api/category/create-category",{name});
            if(res?.data.success){
                toast.success(`${name} is created`);
                getAllCategory();
            }
        } catch (error) {
            console.log(error);
            toast.error(res.data.message)
        }

        setName("")
    };
    // handle update
    const handleUpdate = async(e)=>{
        e.preventDefault();
        console.log(name);
        try {
            const res = await axios.put(`http://localhost:8080/api/category/update-category/${selected._id}`,{name:updatesName});
            if(res?.data.success){
                toast.success(`${updatesName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false)
                getAllCategory();
            }
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(res.data.message)
        }
    }

    // handle delete
    const handleDelete = async (pId) => {
        try {
          const { data } = await axios.delete(
            `http://localhost:8080/api/category/delete-category/${pId}`
          );
          if (data.success) {
            toast.success(`category is deleted`);
    
            getAllCategory();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Somtihing went wrong");
        }
      };

    //get all category
    const getAllCategory = async()=>{
        try {
            const res = await axios.get("http://localhost:8080/api/category/get-categories");
            if(res && res.data.success){
                setCategories(res.data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("error while getting category");
        }
    }

    useEffect(()=>{
        getAllCategory();
    },[])
    return(
        <Layout title={"Create-Category"}>
            <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3"><AdminMenu/></div>
                <div className="col-md-9">
                    <h2>Manage Category</h2>
                    <div className="p-3 w-75">
                        <CategoryForm handleSubmit={submit} value={name} setValue={setName}/>
                    </div>
                    <div className="w-75">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map(category =>(
                                    <tr>
                                        <>
                                            <td key={category._id}>{category.name}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-primary m-2" 
                                                    onClick={()=> {
                                                        setVisible(true);
                                                        setUpdatedName(category.name)
                                                        setSelected(category)
                                                    }}
                                                    >Edit</button>
                                                <button 
                                                        className="btn btn-danger" 
                                                        onClick={()=>{handleDelete(category._id)}}
                                                    >Delete
                                                </button>
                                            </td>
                                        </>   
                                    </tr>    
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal 
                    onCancel={()=> setVisible(false)} 
                    footer={null}  
                    open={Visible}
                >
                    <CategoryForm value={updatesName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                </Modal>
            </div>
            </div>
        </Layout>
    )
}