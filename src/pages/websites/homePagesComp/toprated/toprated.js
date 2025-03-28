import React, { useEffect, useState } from "react";
import {
    MDBContainer,

} from "mdb-react-ui-kit";
import ProductTopRated from "./ProductTopRated";
import ProductCart from "../productCart";
import { Axios } from "../../../../comonants/axios/Axios";
import { TopRatedApi } from "../../../../APIs/API";
import SkeletonComp from "../component/Skeltoncomp";

export default function TopRated() {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);
    console.log(data)
    useEffect(() => {

        Axios.get(`${TopRatedApi}`)
            .then((data) => setData(data.data))
            .finally(() => setloading(false))
            .catch((err) => console.log(err))
    }, [])
    const showData = data.map((item, index) => {
        return (
            <ProductCart sale key={index} item={item} />
            //    <ProductTopRated item={item} key={index}/> 
        )
    })
    return (
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h2 style={{ backgroundColor: 'blue', color: 'white', width: '90%', textAlign: 'center', padding: '5px', borderRadius: '3px' }}>
                <strong>Top Rated</strong>
            </h2>
            <div style={{
                width: '95vw', alignItems: 'center',
                // overflowX:'auto',
                display: 'flex',
                background: 'transparent',
                backdropFilter: `blur('3px)`,
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                alignItems: 'start'
                // scrollSnapType:'mandatory',
                // scrollSnapPointsX:`repeat('95%')`,
                // scrollSnapType:'x mandatory',

            }}>
                {loading ?
                    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '90vw', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems: 'center' }}>
                            <SkeletonComp width={'300px'} height={'400px'} count={4} margin={'10px'} />
                        </div>
                    </div> :
                    showData}
            </div>
        </div>

    )
}