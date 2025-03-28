import { Navigate, Outlet } from 'react-router-dom';
import Cookie from 'universal-cookie';
export default function RequereBack() {
    const cookie =new Cookie();
    const token = cookie.get("e-commerce");
    return token ? window.history.back() : <Outlet />
}