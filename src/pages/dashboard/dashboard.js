import { useContext, useRef } from "react"
import "./dashboard.css"
import LeftDashBoard from "./leftdashboard"
import Topbar from "./topbar"
import { menu } from "../../comonants/context/context"
import { WindowSize } from "../../comonants/context/windowSize"
import { Outlet } from "react-router-dom"

export default function Dashboard(){
    const isopen = useContext(menu);
    const widthscreen = useContext(WindowSize);
   
    return(
        <div style={{background:'black'}}>
            <Topbar className='dashboardtop'/>
            <div className="row " style={{marginTop:'60px'}}>
                <div  id="dashboardleft" style={{
                      width :isopen.isopen ?(widthscreen.width<800 ? "50vw" : ''):'100px',
                       marginLeft : widthscreen.width < 768 ?(isopen.isopen ? "0":"-100px") : '0',
                        }}>
                        <LeftDashBoard/>
                </div>
                    <div style={{position:"relative",width:'17vw',transition:'0.3s',width:
                     isopen.isopen ? '17vw' : '100px',
                     marginLeft : widthscreen.width < 768 ?(isopen.isopen ? "0":"-100px") : '0',  
                      }}  >
                    </div>
                <div id="rightdashboard" className='col' >  
                   <Outlet/> 
                </div> 
                 
            </div>
        </div>
    )
}
 

