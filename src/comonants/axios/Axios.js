import axios from "axios";
import { main_api } from "../../APIs/API";
import Cookie from "cookie-universal"

const cookie = Cookie();
const token = cookie.get('e-commerce');


export const Axios = axios.create({
    baseURL: main_api,
    headers:{
        Authorization :`Bearer ` + token,
    },
});