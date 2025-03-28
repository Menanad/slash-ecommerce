import { useEffect, useState } from "react";
import { Productsapi } from "../../../../APIs/API";
import { Axios } from "../../../../comonants/axios/Axios";
import ProductCart from "../productCart";
import SkeletonComp from "../component/Skeltoncomp";
import { useParams } from "react-router-dom";

export default function CategouriesComp() {
    const { id } = useParams()
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);
    console.log(products)
    useEffect(() => {
        try {
            // LatestProduct
            const res = Axios.get(`${Productsapi}`)
                .then((data) => setproducts(data.data))
                .finally(() => setloading(false))

        } catch (err) { console.log(err) }
    }, [])
    const showdatafilter = products.filter((item) => item.category == id)
    const showData = showdatafilter.map((item, index) => {
        return (

            <ProductCart sale key={index} item={item} />

        )
    })
    return (


        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h2 style={{ backgroundColor: 'blue', color: 'white', width: '90%', textAlign: 'center', padding: '5px', borderRadius: '3px' }}>
                <strong>*Products*</strong>
            </h2>
            <div style={{
                width: '95vw', alignItems: 'center',
                // overflowX:'auto',
                display: 'flex',
                background: 'transparent',
                backdropFilter: `blur('3px)`,
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                // scrollSnapType:'mandatory',
                // scrollSnapPointsX:`repeat('95%')`,
                // scrollSnapType:'x mandatory',

            }} className="container1">
                {loading ?
                    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '90vw', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems: 'center' }}>
                            <SkeletonComp width={'300px'} height={'400px'} count={4} margin={'10px'} />
                        </div>
                    </div> :
                    showdatafilter.length < 1 ?
                        <h1>there is no products now</h1> :
                        showData}
            </div>
        </div>
    )
}