import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal"
import { useEffect, useState } from "react";
import { main_api, USER } from "../APIs/API";
import LoadingBage from "./Loadingpage";
import { Axios } from "../comonants/axios/Axios";
import Page403 from "./websites/forebidden/403";

export default function ProtectRouts({ allowedRole }) {
  // navegate
  const nav = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  // user
  const [User, setuser] = useState('');
  const [usercurrent, setusercurrent] = useState()
  useEffect(() => {

    const res = Axios.get(`${USER}`)
      .then((data) => {
        setuser(data.data)
        setusercurrent(data.data.role)
      })
      .catch(() => { nav('/login') })
  }, [])
  //  get user current



  //  (token ?(user==='' ? <LoadingBage/> :<Outlet/>):<Navigate to={'/login'} replace={true}></Navigate>)
  return (
    // token ?
    //   User === '' ? <LoadingBage />
    //     : allowedRole.includes(usercurrent) ?
    //       <Outlet /> :
    //       <Navigate to={'/403'} replace={true} />

    //   : <Navigate to={'*'} replace={true} />
    token?(
      User === '' ?( <LoadingBage />
      ):allowedRole.includes(usercurrent)?(
        <Outlet/>
      ):(
        <Page403 role={usercurrent} />
      )
    ):(
      <Navigate to={'/login'} replace={true} />
    )
  )
}