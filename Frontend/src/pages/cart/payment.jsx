import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import DropIn from "braintree-web-drop-in-react";
import { useCard } from "../../context/card";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function Payment(){
    const [card, setCard] = useCard();
    const [auth , setAuth] = useAuth();
    const [clientToken , setclientToken] = useState("");
    const [instance , setinstance] = useState();
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate();
    const getPaymentToken = async()=>{
        try {
            const { data } = await axios.get("http://localhost:8080/api/product/braintree/token");
            setclientToken(data?.clientToken);
          } catch (error) {
            console.log(error);
          }
        };
    
    useEffect(()=>{
        getPaymentToken();
    },[auth?.token])

    // handle payment 
    const handlePayment = async()=>{
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("http://localhost:8080/api/product/braintree/payment", {
              nonce,
              card,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCard([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
    }
    return(
        <Layout>
            <div className="mt-5 payment">
                {!clientToken || !card?.length ? (""):(
                    <>
                        <DropIn
                            options={{
                            authorization: clientToken,
                            paypal: {
                            flow: "vault",
                            },
                            }}
                            onInstance={(instance) => setinstance(instance)}
                        />
                        <button className=" btn btn-primary buy-btn" onClick={handlePayment} 
                            disabled={loading || !instance || !auth?.user?.address}>
                                 {loading ? "Processing..": "Make payment"}
                        </button>
                    </>
                )}
                             
            </div>
        </Layout>
    )
}