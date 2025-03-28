import { createContext, useState } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({children}){
    const [width, setWidth] = useState(window.innerWidth);
    window.addEventListener('resize' , ()=>{setWidth(window.innerWidth)})
    
  return(

   <WindowSize.Provider value={{width, setWidth}}>
     {children} 
  </WindowSize.Provider>
  );
}