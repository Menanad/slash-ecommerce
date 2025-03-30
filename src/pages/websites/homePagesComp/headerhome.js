import React, { useEffect, useRef, useState } from 'react';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBBtn,
    MDBNavbarNav,
    MDBIcon,
    MDBInputGroup,
    MDBInput,
    MDBSpinner,
} from 'mdb-react-ui-kit';


import './headerhome.css'
import image from './Blue_Modern_Illustrative_Online_E-Commerce_Shop_Logo_1_-removebg-preview.png'
import { Link } from 'react-router-dom';
import PlusMunis from '../singleProduct/plusMinus';
import Cookie from 'cookie-universal'
import { LOGOUT, USER } from '../../../APIs/API';
import { Axios } from '../../../comonants/axios/Axios';

export default function HeaderHome() {
    const [searchfocus, setsearchfocus] = useState(false)
    const [search, setsearch] = useState('')
    const [count, setcount] = useState()

    const [basicModal, setBasicModal] = useState(false);
    const [scrollableModal, setScrollableModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);
    const [products, setProducts] = useState([])
    console.log(products)
    const [showSearchAlert, setShowSearchAlert] = useState(false);
    const [loadingStock, setLoadingStock] = useState(false);

    useEffect(() => {
        const products2 = JSON.parse(localStorage.getItem('product')) || []
        setProducts(products2);
    }, [localStorage.product])
    // handle Delete
    function handleDelete(id) {
        const filterProducts = products.filter((pro) => pro.id != id)
        setProducts(filterProducts)
        localStorage.product = JSON.stringify(filterProducts)

    }

    const showproducts = products.map((item, index) => {
        return (
            <>
                <div className='col-12' style={{ display: 'flex', marginBottom: '10px' }}>
                    <div>
                        <img style={{ width: '125px', height: '90px', objectFit: 'contain', objectPosition: 'center' }} src={` https://back-end-e-commerce-production-85fa.up.railway.app/${item.images[0].image}`} />
                        <PlusMunis setStockLoading={(data) => setLoadingStock(data)} id={item.id} count={item.count || 1} setCount={(data) => setcount(data)} />
                    </div>
                    <div style={{ padding: ' 0 20px 20px 20px', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div><h5>{item.title}</h5></div>
                            <div onClick={() => handleDelete(item.id)}>
                                <MDBIcon style={{ fontSize: '20px', cursor: 'pointer' }} fas icon="trash" />
                            </div>
                        </div>
                        <p className='text-muted'>{item.description.length > 30 ? item.description.slice(0, 30) : item.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div><h6 style={{ fontWeight: '800' }}>{item.price} <span className='text-primary' style={{ fontWeight: '300' }}> EGP</span></h6></div>
                            <div>{item.discount != 0 && <s className='text-muted'>was {item.discount} EGP</s>}</div>
                        </div>
                        {loadingStock && <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <MDBSpinner color='primary' role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>
                        </div>}
                    </div>
                </div>
                <hr />
            </>
        )
    }

    )
    // function handle user
    const cookie = Cookie()
    const user = cookie.get('e-commerce') || null
    function userhandle() {

        if (!user) {
            window.location.pathname = '/login'
        } else {
            setScrollableModal(!scrollableModal)
        }
    }
    async function handleLogOut() {
        try {
            const res = Axios.get(`${LOGOUT}`)
            cookie.remove('e-commerce')
            window.location.pathname = "/"
        } catch (err) {
            console.log(err)
        }

    }
    const [currentusername, setcurrentusername] = useState('')
    const [currentuseremail, setcurrentuseremail] = useState('')
    useEffect(() => {
    if(user){
        try {
            let res = Axios.get(`${USER}`)
                .then((data) => { setcurrentusername(data.data.name); setcurrentuseremail(data.data.email) })
        } catch (err) {
            console.log(err)
        }
    }
    }, [])
    return (
        // <>
        //     <div class="carousel">
        //         <div class="group">
        //             <div class="card">A</div>
        //             <div class="card">B</div>
        //             <div class="card">C</div>
        //         </div>

        //         <div aria-hidden class="group">
        //             <div class="card">A</div>
        //             <div class="card">B</div>
        //             <div class="card">C</div>
        //         </div>
        //     </div>
        //     </>
        // <div className="mainheader">
        //     <div className="righthearder">
        //         <div className="logoheader">
        //             <Link to="/">
        //                 <img style={{ cursor: 'pointer' }} href="/" src={image} />
        //             </Link>
        //         </div>
        //     </div>

        //     <div className="meddleheader">
        //         <div onMouseLeave={() => { search == '' && setsearchfocus(false) }} onClick={() => setsearchfocus(true)} onMouseEnter={() => setsearchfocus(true)} className="searchheader">

        //             <div style={{ transition: '0.1s', width: !searchfocus && '0px', padding: !searchfocus && '0px', display: !searchfocus && 'none', border: !searchfocus && 'none' }}>
        //                 <input type='text' onChange={(e) => { setsearch(e.target.value); e.target.value.length == 0 && setsearchfocus(false) }} placeholder='Search ...'></input>
        //                 <i style={{ display: !searchfocus && 'none' }} className="fas fa-magnifying-glass"></i>
        //             </div>
        //             <i style={{
        //                 fontSize: '20px', color: '#272343', cursor: 'pointer', display: searchfocus && 'none', marginLeft: "-10px"
        //             }} className="fas fa-magnifying-glass" ></i>

        //         </div>
        //     </div>
        //     <i onClick={toggleOpen} style={{ cursor: 'pointer', fontSize: '20px' }} className="fas fa-cart-shopping"></i>
        //     <div  >
        //         <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        //             <MDBModalDialog>
        //                 <MDBModalContent>
        //                     <MDBModalHeader>
        //                         <MDBModalTitle>Modal title</MDBModalTitle>
        //                         <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
        //                     </MDBModalHeader>
        //                     <MDBModalBody>...</MDBModalBody>

        //                     <MDBModalFooter>
        //                         <MDBBtn color='secondary' onClick={toggleOpen}>
        //                             Close
        //                         </MDBBtn>
        //                         <MDBBtn>Save changes</MDBBtn>
        //                     </MDBModalFooter>
        //                 </MDBModalContent>
        //             </MDBModalDialog>
        //         </MDBModal>
        //     </div>
        //     <div className="lefthearder">
        //         <div className="accountheader">
        //             <i className="fas fa-user"></i>
        //         </div>
        //     </div>


        // </div>


        <div style={{ width: '100%', padding: '15px', position: 'sticky', top: '0px', left: '0', zIndex: '999', backgroundColor: 'white' }}>

            <div className='row'>
                <div className='col-3 '>
                    <div className="logoheader ">
                        <Link to="/">
                            <img style={{ cursor: 'pointer', width: '70px' }} href="/" src={image} />
                        </Link>
                    </div>
                </div>
                <div className='col-6'>
                    <MDBInputGroup>
                        <MDBInput label='Search' />
                        <MDBBtn onClick={() => setShowSearchAlert(true)} rippleColor='dark'>
                            <MDBIcon icon='search' />
                        </MDBBtn>
                    </MDBInputGroup>


                </div>
                <div className='col-3 '>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'end', alignItems: 'center' }}>
                        <div><i onClick={toggleOpen} style={{ fontSize: '25px', marginRight: '20px', cursor: 'pointer' }} className="col fas fa-cart-shopping"></i></div>
                        <div className="accountheader " onClick={userhandle}>
                            <i className="fas fa-user "></i>
                        </div>
                    </div>

                    <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
                        <MDBModalDialog>
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>Shopping Cart</MDBModalTitle>
                                    <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <div className='row'>
                                        {showproducts}

                                    </div>
                                </MDBModalBody>

                                <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={toggleOpen}>
                                        Close
                                    </MDBBtn>
                                    <MDBBtn>Checkout</MDBBtn>
                                </MDBModalFooter>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                    {/* ------------------------------------ */}
                    <MDBModal open={scrollableModal} onClose={() => setScrollableModal(false)} tabIndex='-1'>
                        <MDBModalDialog scrollable>
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>Hi-{currentusername ? currentusername : "User"}</MDBModalTitle>
                                    <MDBBtn
                                        className='btn-close'
                                        color='none'
                                        onClick={() => setScrollableModal(false)}
                                    ></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <h5>your email: {currentuseremail ? currentuseremail : "Loading..."}</h5>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={() => setScrollableModal(!setScrollableModal)}>
                                        Close
                                    </MDBBtn>
                                    <MDBBtn className='bg-danger' onClick={handleLogOut}>Log-Out</MDBBtn>
                                </MDBModalFooter>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>

                </div>
            </div>

        </div>


    )
}