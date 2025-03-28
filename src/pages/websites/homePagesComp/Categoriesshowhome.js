import { useEffect, useState } from "react";
import { CATEGORIES } from "../../../APIs/API";
import { Axios } from "../../../comonants/axios/Axios";
import React from 'react';

import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";

import SkeletonComp from "./component/Skeltoncomp";
import { Link } from "react-router-dom";
export default function ShowCtegories() {
    // get Categoury
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        try {
            const res = Axios.get(`${CATEGORIES}`)
                .then((data) => setCategories(data.data))
                .finally(() => setLoading(false))
        } catch (err) {
            console.log(err)
        }

    }, [])
    console.log(categories)

    const showCategouries = categories.map((item, index) => {
        return (
            
                <MDBCol key={index} className="mb-4">
                    <Link key={index} to={`/categories/${item.id}`}>
                    <MDBRipple
                        rippleColor="dark"
                        rippleTag="div"
                        className="bg-image rounded hover-zoom shadow-1-strong"
                    >
                        <img
                            className="imgincatiories"

                            src={`https://back-end-e-commerce-production-2a6c.up.railway.app/${item.image}`}
                            fluid

                        />
                        <a href="#!">
                            <div
                                className="mask"
                                style={{ backgroundColor: "rgba(85, 75, 75, 0.2)" }}
                            >
                                <div className="d-flex justify-content-start align-items-start h-100">
                                    <h5>
                                        <span className="badge bg-light pt-2 ms-3 mt-3 text-dark">
                                            {item.title.length > 8 ? item.title.slice(1, 8) + "...." : item.title}
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <div className="hover-overlay">
                                <div
                                    className="mask"
                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                ></div>
                            </div>
                        </a>
                    </MDBRipple>
                    </Link>
                </MDBCol>
            
        )
    })
    return (
        <MDBContainer fluid className="my-5 text-center">
            <h4 className="mt-4 mb-5">
                <strong>Categories</strong>
            </h4>

            <MDBRow className="backgroundfilter" style={{ width: '100vw', justifyContent: 'center' }}>
                {loading ?
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>

                        <SkeletonComp count={24} width={'200px'} height={'150px'} margin={'10px'} />
                    </div>
                    : showCategouries}

            </MDBRow>
        </MDBContainer>
    )
}