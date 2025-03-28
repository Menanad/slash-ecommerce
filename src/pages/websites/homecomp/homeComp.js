import InfiniteScroll from "../homePagesComp/infinite scroll/infinitescrollheader";
import LatestProduct from "../homePagesComp/latestProduct/latestProduct";
import ScrollOnHeader from "../homePagesComp/scrollontheheader/ScrollOnHeader";
import TopRated from "../homePagesComp/toprated/toprated";
import LatestSaleProduct from "../landing/product/latestSaleProduct";

export default function HomeComp() {
    return (
        <>
            <ScrollOnHeader />
            <LatestSaleProduct />
            <InfiniteScroll />
            <TopRated />
            <LatestProduct />
        </>
    )
}