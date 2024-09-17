import Layout from "../../components/Layout/Layout";
import { useCard } from "../../context/card";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import SubTotal from "./subTotal";
import ProceedToBuy from "./ProceedToBuy";
import "./BuyNow.css"
 

export default function AddToCardPage(){
    const [card, setCard] = useCard();
    const [auth , setAuth] = useAuth();
    
    const removeCartItem = (id)=>{
        try {
            let MyCart = [...card]
            let index = MyCart.findIndex(item => item._id === id)
            MyCart.splice(index,1)
            setCard(MyCart)
            localStorage.setItem("cart",JSON.stringify(MyCart));
        } catch (error) {
            console.log(error)
        }
    }
     
     
    return(
        <Layout>
            <h1 className="text-center">{`Hello ${auth?.token && auth?.user?.name}`}</h1>
            <h4 className="text-center">
                {card?.length >=1 ? 
            `you have total ${card?.length} products in cart ${auth?.token ? "" : "please login to checkout"}` 
            : "your card is empty"
            }
            </h4>
            <div className="buy_section">
            <div className="buy_container">
                <div className="left">
                    <h1>Shopping Cart</h1>
                    <p>Select All Items</p>
                    <span className="leftBuyPrice">Price</span>
                     <hr></hr>
                    {card?.map((p)=>(
                        <>
                            <div className="item_container" key={p._id}>
                                <img src={`http://localhost:8080/api/product/product-image/${p._id}`} alt="" />
                                <div className="itemDetail">
                                    <h3>{p.category.name}</h3>
                                    <h3>{p.name}</h3>
                                    <h3 className="itemPrice1">&#8377; {p.price}</h3>
                                    <p className="usual">Usually dispatched in 8 days</p>
                                    <p>Eligible for FREE Shipping</p>
                                    <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" />
                                    <div className="Addselect">

                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                                
                                    <p style={{
                                        cursor:"pointer",
                                    }}
                                    onClick={()=>{
                                        removeCartItem(p._id)
                                    }}
                                    >Delete</p>
                                
                                <span>|</span>
                                <p className="removeMedia">Save Or Later</p>
                                <span>|</span>
                                <p className="removeMedia">See More like this</p>

                            </div>
                            </div>
                                <h3 className="itemPrice2">&#8377;{p.price}</h3>   
                            </div>
                            <hr></hr>
                        </>
                    ))}
                     
                     <SubTotal/>

                </div>
                <div className="right">
                    <ProceedToBuy/>
                </div>
            </div>
            </div>
        </Layout>
    )
}