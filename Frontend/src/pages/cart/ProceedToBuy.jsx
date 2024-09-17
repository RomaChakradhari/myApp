import { useCard } from "../../context/card";
import { useAuth } from "../../context/auth";
import SubTotal from "./subTotal";
import { useNavigate } from "react-router-dom";
export default function ProceedToBuy(){
    const [card, setCard] = useCard();
    const [auth , setAuth] = useAuth();
    const navigate = useNavigate();
    return(         
        <div className="Proceed_buy">
            <div className="address">
                <h3>Address :-</h3>
                {auth?.user?.address ? (
                    <>
                        <div className="currentAd">
                            <h4>Your Current Address</h4>
                            <h5 className="text-center">{auth?.user?.address}</h5>
                            <button className="buy-btn" onClick={()=> navigate("/dashboard/user/profile")}>Update Address</button>
                        </div>
                    </>
                ) : (
                    <div className="curr">
                        {auth?.token ? (
                            <button className="buy-btn" onClick={()=> navigate("/dashboard/user/profile")}>Update Address</button>
                        ):(
                            <button className="buy-btn" onClick={()=> navigate("/login" , {
                                state:"/cart"
                            })}>Please login to checkout</button>
                        )}
                    </div>
                )}
            </div>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"  alt="" />
            <div className="cost">
                <p>Your order is Eligible for FREE Delivery</p><br></br>
                <span style={{color:"#565959"}}>Select this option at checkout . Details</span>

                <SubTotal/>
                <button className="Buy_btn" onClick={()=> navigate("/payment")}>Process to Buy</button>
                <div className="emi">
                    Emi availabe
                </div>
            </div>
        </div>
 
    )
}