import { useEffect, useState } from "react";
import { CATEGORIES } from "../../../APIs/API";
import { Axios } from "../../../comonants/axios/Axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import SkeletonComp from "../homePagesComp/component/Skeltoncomp";
import LatestSaleProduct from "./product/latestSaleProduct";
import TopRated from "../homePagesComp/toprated/toprated";
import LatestProduct from "../homePagesComp/latestProduct/latestProduct";


export default function Landing() {
    const [categories, setCategories] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        try {
            const res = Axios.get(`${CATEGORIES}`)
                .then((data) => setCategories(data.data))
                .finally(() => setloading(false))
        } catch (err) {
            console.log(err)
        }
    }, [])
    const showCategouries = categories.slice(0,5)
    console.log(showCategouries)
    const showCategouries2 = showCategouries.map((item, index) => {
        return (
           <Link to={`/categories/${item.id}`}> <h6 id="linkbtn" key={index}>{item.title.length > 12 ? item.title.slice(0, 12) + "...." : item.title}</h6></Link>
        )
    })

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'start',flexWrap:'wrap' }}>
            <div style={{ width: '70%', display: 'flex', flexWrap: 'wrap', justifyContent: 'start', padding: '10px' }}>
                {loading ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap:'wrap'
                    }}>

                        <SkeletonComp width={'100px'} height={'15px'} count={5} margin={'5px'} />


                    </div>
                    : showCategouries2}
                <h6 id="linkbtn" style={{ fontWeight: '600', cursor: 'pointer' }}><Link to="/categories">Show All</Link></h6>
            </div>
            
           
        </div>
    )
}