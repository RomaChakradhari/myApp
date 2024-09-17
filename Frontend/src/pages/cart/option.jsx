import { useCard } from "../../context/card";
import { useAuth } from "../../context/auth";

export default function Option(id){
    const [card, setCard] = useCard();
    const [auth , setAuth] = useAuth();
    //delete item
    const removeCartItem = (id)=>{
        try {
            let MyCart = [...card]
            let index = MyCart.findIndex(item => item._id === id)
            MyCart.splice(index,1)
            setCard(MyCart)
        } catch (error) {
            console.log(error)
        }
    }
    return(
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
                    removeCartItem(id={id})
                }}
                >Delete</p>
             
            <span>|</span>

            <p className="removeMedia">Save Or Later</p>
             <span>|</span>

            <p className="removeMedia">See More like this</p>
        </div>
    )
}