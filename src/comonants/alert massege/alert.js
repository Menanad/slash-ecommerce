import { useEffect, useState } from "react"

export default function Alert(){
    const [close, setclose]=useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
           setclose(true)
        }, 4000);
        return () => clearTimeout(timer);
      }, []);

    return(
       
        <div style={{
            width:'20%',
            height:'90px'
            ,backgroundColor:'green',
            position:'absolute',
            bottom:'10px',
            right:'10px',
            borderRadius:'10px'
            ,transition:'1s',zIndex:'100'
            ,display: close?"none":''
        }}
        >
            <div style={{
                height:'100%',
                width:'100%',
                borderRadius:'5px',
                display:'flex',
                flexDirection:'column',justifyContent:'space-around'
            }}>
               <div style={{alignSelf:'end', marginRight :'5px', marginTop:'5px', cursor:'pointer'}} onClick={()=>setclose(true)}><i style={{color:'white', fontSize:'20px'}}  className="far fa-circle-xmark  "></i></div>
               <div style={{alignSelf:'center', marginBottom:'30px',fontSize:'22px', color:'yellow'}}>Save Successfully <i class="fas fa-check"></i></div>
            </div>
        </div>

      
    )
}