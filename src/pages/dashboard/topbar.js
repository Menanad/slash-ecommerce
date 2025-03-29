import { useContext, useEffect, useState } from "react";
import { menu } from "../../comonants/context/context"
import { WindowSize } from "../../comonants/context/windowSize";
import "./dashboard.css"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { Axios } from "../../comonants/axios/Axios";
import { LOGOUT, USER } from "../../APIs/API";
import Cookie from 'cookie-universal'
export default function Topbar() {
    const isopen = useContext(menu);
    const [click, setclick] = useState(false);
    const [currentuser, setcurrentuser] = useState('');
    const widthscreen = useContext(WindowSize);
    if (widthscreen.width >= 768 && !click) {
        isopen.setisopen(true);
    }
    function sidebar() {
        isopen.setisopen(!isopen.isopen);
        setclick(!click);
    }
    // test
    const conm = useContext(WindowSize)
    console.log(conm.width)
    // nav
    const nav = useNavigate()
    // get user name
    useEffect(() => {
        let res = Axios.get(`${USER}`)
            .then((data) => setcurrentuser(data.data.name))
    }, [])
    // log out function
    const cookie = Cookie()
    async function handleLogOut() {
        try {
            const res = Axios.get(`${LOGOUT}`)
            cookie.remove('e-commerce')
            window.location.pathname = "/"
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="dashboardtop">
            <div style={{ width: '100vw', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <div style={{ flexGrow: '8', marginLeft: '20px' }}>
                    <h2 style={{ color: " #fed000", cursor: 'pointer', fontWeight: '600' }}>
                        <i class="fas fa-table-columns ii" >Dashboard</i>
                        <i onClick={sidebar} className="fas fa-bars ii" style={{ marginLeft: '15px', color: '#d22034', cursor: 'pointer' }}></i>
                    </h2> 
                </div>
                <div style={{ marginRight: '30px' }}>
                    <MDBDropdown dropleft group>
                        <MDBDropdownToggle style={{ fontFamily: 'sans-serif', fontsize: '17px' }}>
                            {currentuser === '' ? "Hi User" : currentuser}
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            {/* <MDBDropdownItem style={{fontSize:'20px'}} link>Action</MDBDropdownItem> */}
                            {/* <MDBDropdownItem style={{ fontSize: '20px' }} divider /> */}
                            <MDBDropdownItem style={{ fontSize: '20px' }} onClick={handleLogOut} link>Log Out</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
            </div>
        </div>
    )
} 