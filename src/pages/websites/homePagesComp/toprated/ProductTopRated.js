import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBRipple,
    MDBBtn,
} from "mdb-react-ui-kit";
 
export default function ProductTopRated(props) {
         let array=[]
       function stars(){
           for (let i = 1; i <= 5; i++) {
             if(i<=Math.round(props.item.rating)){
                array.push( <MDBIcon fas icon="star" />)
             }else{
                array.push( <MDBIcon far icon="star" />)
             } 
    
            
           } 
            
       } 
       stars()
    return (
                    <MDBRow className="justify-content-center mb-0" style={{scrollSnapAlign:'start',width:'50%',margin:'5px' }}>
                        <MDBCol md="12" xl="10">
                            <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                            <MDBRipple 

                                                rippleColor="light"
                                                rippleTag="div"
                                                className="bg-image rounded hover-zoom hover-overlay "
                                                className="backgroundimginimg"
                                            >
                                                <MDBCardImage
                                                    src={props.item.images[0].image}
                                                    fluid
                                                    className="w-100"
                                                    style={{objectFit:'cover'}}
                                                />
                                                <a href="#!">
                                                    <div
                                                        className="mask"
                                                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                    ></div>
                                                </a>
                                            </MDBRipple>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <h5>{props.item.title}</h5>
                                            <div className="d-flex flex-row">
                                                <div className="text-danger mb-1 me-2">
                                                    {array}
                                                </div>
                                                
                                            </div>
                                            <div className="mt-1 mb-0 text-muted small">
                                                <span>100% cotton</span>
                                                <span className="text-primary"> • </span>
                                                <span>Light weight</span>
                                                <span className="text-primary"> • </span>
                                                <span>
                                                    Best finish
                                                    <br />
                                                </span>
                                            </div>
                                            <div className="mb-2 text-muted small">
                                                <span>Unique design</span>
                                                <span className="text-primary"> • </span>
                                                <span>For men</span>
                                                <span className="text-primary"> • </span>
                                                <span>
                                                    Casual
                                                    <br />
                                                </span>
                                            </div>
                                            <p className="text-truncate mb-4 mb-md-0">
                                                There are many variations of passages of Lorem Ipsum
                                                available, but the majority have suffered alteration in some
                                                form, by injected humour, or randomised words which don't
                                                look even slightly believable.
                                            </p>
                                        </MDBCol>
                                        <MDBCol
                                            md="6"
                                            lg="3"
                                            className="border-sm-start-none border-start"
                                        >
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                <h4 className="mb-1 me-1">$13.99</h4>
                                                <span className="text-danger">
                                                    <s>$20.99</s>
                                                </span>
                                            </div>
                                            <h6 className="text-success">Free shipping</h6>
                                            <div className="d-flex flex-column mt-4">
                                                <MDBBtn color="primary" size="sm">
                                                    Details
                                                </MDBBtn>
                                                <MDBBtn outline color="primary" size="sm" className="mt-2">
                                                    Add to wish list
                                                </MDBBtn>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
    )
}