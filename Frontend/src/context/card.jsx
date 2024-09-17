import { useState, useContext, createContext, useEffect } from "react";

const CardContext = createContext();
const CardProvider = ({ children }) => {
  const [Card, setCard] = useState([]);

  useEffect(()=>{
    let cartItem = localStorage.getItem("cart")
    if(cartItem) setCard(JSON.parse(cartItem));
  },[])

  return (
    <CardContext.Provider value={[Card, setCard]}>
      {children}
    </CardContext.Provider>
  );
};

// custom hook
const useCard = () => useContext(CardContext);

export { useCard, CardProvider };