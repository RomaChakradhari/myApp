import { createContext, useState, useContext, useEffect,} from "react";
import axios from "axios";

//create context 
const AuthContext = createContext();

const AuthProvider = ({children})=>{
    //create state
    const [auth, setAuth] = useState({
        user:null,
        token:"",
    });

    //default axios
    axios.defaults.headers.common["Authorization"]= auth?.token

    useEffect(()=>{
        const data = localStorage.getItem("auth")
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token,
            })
        }
        
    },[]);
    return(
        <AuthContext.Provider value={[auth , setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//create custom hook
const useAuth = ()=> useContext(AuthContext);
export {AuthProvider, useAuth};