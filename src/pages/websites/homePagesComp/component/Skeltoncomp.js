import Skeleton from "react-loading-skeleton";

export default function SkeletonComp(props){
    let array =[];
    for (let i = 0; i < props.count; i++) {
        array.push( <Skeleton   width={props.width} height={props.height} style={{ margin:`${props.margin}` }} />)
    }
    
    return array;
}