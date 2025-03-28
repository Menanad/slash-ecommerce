
import { Outlet } from "react-router-dom";
import ProductCart from "./homePagesComp/productCart";
import Landing from "./landing/landing";
import LatestSaleProduct from "./landing/product/latestSaleProduct";
import TopRated from "./homePagesComp/toprated/toprated";
import LatestProduct from "./homePagesComp/latestProduct/latestProduct";
export default function HomePage() {
    // get Categoury

    return (
        <div >
            <div >
                <Landing />
                <Outlet />
            </div>
        </div>
    )
}