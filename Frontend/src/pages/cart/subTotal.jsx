 
import { useCard } from "../../context/card";


export default function SubTotal(){
    const [card, setCard] = useCard();
     
    const totalPrice = card
    .map(p => Number(p.price))  // Convert price to number
    .reduce((sum, price) => sum + price, 0);  // Calculate total

console.log('Total Price:', totalPrice);  
    return(
        <div className="SubItem">
            <h3>Subtotal  ({card?.length} items) :  
            <strong style={{
                fontWeight:"700",
                color:"#111"
            }}>&#8377;{totalPrice}</strong></h3>
        </div>
    )
}