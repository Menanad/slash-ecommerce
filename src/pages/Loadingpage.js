import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

export default function LoadingBage(){
    return(
        <div style={{width:'100vw' ,height:'100vh'  ,backdropFilter:'blur(3px)' ,display:'flex' ,justifyContent:'center', alignItems:'center',float:'left'}}>
          <div>
          <MDBSpinner role='status' style={{width:'4rem' ,height:'4rem' ,fontSize:'30px' ,color:'blue'}}>
              <span className='visually-hidden'>Loading...</span>
           </MDBSpinner>
          </div>
        </div>
    )
}