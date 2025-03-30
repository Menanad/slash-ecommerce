
import React, { useEffect } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBCard,
    MDBRipple,
    MDBCardImage,
    MDBCardBody,
    MDBBtn,

} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import './headerhome.css'
export default function ProductCart(props) {
    let array = []
    function stars() {
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.round(props.item.rating)) {
                array.push(<MDBIcon fas icon="star" />)
            } else {
                array.push(<MDBIcon far icon="star" />)
            }


        }

    }
    stars()


    return (



        // <div style={{  boxShadow:' 0 0 3px 2px rgba(10, 1, 65, 0.12)',  backgroundColor:'white',borderRadius: '10px', width: '300px', padding:'0 0 20px 0',margin:'10px' }}>

        //     <div className="backgroundimginimg">

        //         <img src={props.item.images[0].image} style={{ width:'300px', height: '200px', objectFit: 'cover', borderRadius:'10px 10px 0 0',objectPosition: 'center' }} />
        //     </div>
        //     <h5 style={{ textAlign:'center',paddingTop:'10px',   color:'rgb(53, 49, 79)'}} >{props.item.title}</h5>

        //     <p style={{ marginLeft:'10px', textAlign:'left',color:'#667171' ,fontSize:'16px'}}> {props.item.description.length>36?props.item.description.slice(0,36)+'....':props.item.description}</p>
        //     <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        //         <div style={{ width: '90%' }}>
        //             <hr />
        //         </div>
        //     </div>
        //     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        //         <p style={{ paddingLeft: '10px' }} className="small text-muted d-flex flex-row justify-content-start mt-1 mb-4 text-danger">Rated {props.item.ratings_number}/5</p>
        //         <div style={{ paddingRight: '10px' }} className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
        //             <MDBIcon fas icon="star" />
        //             <MDBIcon fas icon="star" />
        //             <MDBIcon fas icon="star" />
        //             <MDBIcon fas icon="star" />
        //             <MDBIcon far icon="star" />

        //         </div>

        //     </div>
        //     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'  }}>
        //         <div style={{  width: '50%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',flexWrap:'nowrap' }}>
        //             <div style={{marginLeft:'5px'}}>
        //                 <h4 style={{paddingRight:'5px',fontWeight:'500'}}>{props.item.price-props.item.discount}<span className="pacifico-regular" style={{color:'#272343' }}>LE</span></h4>
        //             </div>
        //             {props.item.discount!=0?
        //                 <div style={{alignContent:'center',height:'20px'}}><p className="descountnumber">{props.item.price  }LE</p></div>
        //                 : ""}
        //         </div>
        //         <div style={{ cursor:'pointer', padding: '5px', border: '2px solid #bae8e8' ,borderRadius:'10px' }}>
        //             <i style={{ fontSize: '25px' }} className="fas fa-cart-shopping"></i>
        //         </div>
        //     </div>

        // </div>
        //  --------------------------------
        <NavLink to={`/product/${props.item.id}`} >
            <MDBCard className="cardmain" >


                <div className="backgroundimginimg">
                    <div style={{
                        backgroundImage: `url(https://back-end-e-commerce-production-85fa.up.railway.app/${props.item.images[0].image})`,
                    }} className="cardmainimage"  >

                        {props.item.discount != 0 && <div
                            className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong tagg"
                            style={{  backgroundColor: '#FB3640', margin: '10px' }}
                        >
                            <p className="text-white mb-0" style={{ fontWeight: '400' }}>{(((props.item.discount - props.item.price) / props.item.discount) * 100).toFixed(0)}%</p>
                        </div>}
                        {props.sale && <div
                            className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong tagg"
                            style={{  backgroundColor: 'blueviolet', margin: '10px 20px 0 0' }}
                        >
                            <p className="text-white mb-0 small">SALE</p>
                        </div>}
                    </div>
                    {/* <img src={props.item.images[0].image} style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0', objectPosition: 'center' }} /> */}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px 0 -20px 0' }}>
                    <hr style={{ width: '90%' }} />
                </div>
                <MDBCardBody>

                    <div style={{ color: 'black' }} className=" mb-2">
                        <h5 className="mb-0">{props.item.title}</h5>

                    </div>
                    <div>
                        <p className="text-muted ">
                            {(props.item.description).length > 50 ? props.item.description.slice(0, 38) + '...' : props.item.description}
                        </p>
                    </div>
                    <div className="mb-2 d-flex " >
                        <h5 style={{ textAlign: 'start', width: '100%' }} className="text-dark mb-0"><span className="text-danger small">EGP </span>{props.item.price}</h5>
                    </div>
                    {props.item.discount != 0 && <div >
                        <p style={{ display: 'inline' }} className="small">
                            <a href="#!" className="text-muted">
                                Was:
                            </a>
                        </p>
                        <p style={{ display: 'inline', fontSize: '15px' }} className=" text-danger">

                            <s><s>EGP</s>{props.item.discount} </s>
                        </p>
                    </div>}


                    <div style={{ margin: '10px 0 0px 0' }} className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">
                            Rated:{props.item.rating}/ <span className="fw-bold">5</span>
                        </p>
                        <div className="ms-auto text-warning">
                            {array}
                        </div> 
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '8px 0 -7px 0' }}>
                        <MDBBtn disabled={props.item.stock==0?true:false}  style={{ width: '90%' }}>{props.item.stock==0?"Is not available now":"Shop Now "} <i className="fas fa-cart-shopping"></i></MDBBtn>
                    </div>

                </MDBCardBody>
            </MDBCard>
        </NavLink >
    )
}