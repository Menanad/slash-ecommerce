import "./dashboard.css";
import { MDBIcon } from 'mdb-react-ui-kit';
import { NavLink } from "react-router-dom";
import { menu } from "../../comonants/context/context";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../comonants/axios/Axios";
import { USER } from "../../APIs/API";

export default function LeftDashBoard() {
    const isopen = useContext(menu);
    // get user
    const [currentuser, setCurrentuser] = useState()
    useEffect(() => {
        Axios.get(`${USER}`)
            .then((data) => setCurrentuser(data.data.role))
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <ul>
                {currentuser === "1995" ?
                    <>
                        <li style={{ marginLeft: isopen.isopen ? "0px" : "-5px" }}><NavLink activeClassName="active" to="users" className="navv"><MDBIcon fas icon="users" /> <h3 style={{
                            display: isopen.isopen ? "inline" : "none"
                        }}
                        > Users</h3>
                        </NavLink></li>

                        <li
                            style={{ marginLeft: isopen.isopen ? "0px" : "-5px" }}><NavLink activeClassName="active" to="addUser" className="navv fas fa-plus"><MDBIcon /> <h3 style={{
                                display: isopen.isopen ? "inline" : "none"
                            }}
                            > Add User</h3>
                            </NavLink></li> <li><hr /></li></> : ''}

                {(currentuser === "1996" || currentuser === "1995") ?
                    <>
                        <li
                            style={{ marginLeft: isopen.isopen ? "0px" : "-5px" }}><NavLink activeClassName="active" to="writer" className="navv far fa-pen-to-square"><MDBIcon /> <h3 style={{
                                display: isopen.isopen ? "inline" : "none"
                            }}
                            > Writer</h3>
                            </NavLink></li>   <li><hr /></li></> : ''
                }

                {(currentuser === "1999" || currentuser === "1995") ?
                    <>
                        <li style={{ marginLeft: isopen.isopen ? "0px" : "-5px" }}><NavLink activeClassName="active" to="categories" className="navv"><MDBIcon className="fas fa-cart-shopping" /> <h3 style={{
                            display: isopen.isopen ? "inline" : "none"
                        }}
                        > Categories</h3>
                        </NavLink></li>

                        <li
                            style={{ marginLeft: isopen.isopen ? "0px" : "-5px" }}><NavLink activeClassName="active" to="addcategories" className="navv fas fa-plus"><MDBIcon /> <h3 style={{
                                display: isopen.isopen ? "inline" : "none"
                            }}
                            > Add Categories</h3>
                            </NavLink>
                        </li>
                        <li><hr /></li>
                        <li
                            style={{ marginLeft: isopen.isopen ? "0px" : "-5px" }}><NavLink activeClassName="active" to="products" className="navv fas fa-basket-shopping" ><MDBIcon /> <h3 style={{
                                display: isopen.isopen ? "inline" : "none"
                            }}
                            > Products</h3>
                            </NavLink>
                        </li>

                        {/* ---------- */}
                        <li><hr /></li>
                    </>
                    : ''}


            </ul>
        </div>
    )
}