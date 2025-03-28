import { Outlet } from "react-router-dom";
import HeaderHome from "./headerhome";

export default function WebSite() {
    return (
        <>
            <HeaderHome />
            <Outlet />
        </>
    )

}