import axios from "axios"
import { LOGOUT, main_api } from "../APIs/API"
import Cookie from 'cookie-universal'
export default function LogOut(){
    async function logout(){
        const cookie =  Cookie();
        const token = cookie.get('e-commerce')
        try{
            let res = await axios.get(`${main_api}${LOGOUT}`, {
            headers:{Authorization:'Bearer ' + token}
        })
        console.log(res)
        if(res.status ===200){
            cookie.remove('e-commerce')
        }
        }catch(err){
            console.log(err)
        }
    }
    return(
      <button type="button" onClick={logout} class="btn btn-danger" data-mdb-ripple-init>Logout</button>
    )
}