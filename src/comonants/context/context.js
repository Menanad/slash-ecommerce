import { createContext, useState } from "react";
export const menu = createContext("");
export default function Menucontext({children}){
    
    const [isopen , setisopen] = useState(false);
    return(
        <menu.Provider value={{isopen , setisopen}}>
              {children}
        </menu.Provider>
    )
}