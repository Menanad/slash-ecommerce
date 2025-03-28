import axios from "axios";
import { useEffect } from "react"
import { GOOGLECALLBACK, main_api } from "../APIs/API";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal"
import LoadingBage from "../pages/Loadingpage";
export default function Googlecallback(){
    const cookie = Cookie();
    
    const location = useLocation()
    useEffect(()=>{
       async function GOOGLeback(){
        try{
            let res = await axios.get(`${main_api}${GOOGLECALLBACK}${location.search}`)
            console.log(res)
            const token = res.data.access_token;
            cookie.set("e-commerce",token)
            window.location.pathname='/'
            

        }catch(err){
            console.log(err);
        }

       }
       GOOGLeback()
    },[])
    
    return(<LoadingBage/>)
}