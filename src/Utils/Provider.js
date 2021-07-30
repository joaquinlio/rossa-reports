import React, { createContext, useState, useEffect} from 'react';
import { createBrowserHistory } from 'history';

// SessionStorage
import { getStorage, clearStorage } from '../Utils/SessionStorage'

export default ({ children },props) =>{
    
    const [ user, setUser] = useState();

    // Si existe un usuario seteado en el storage se setea al cargar el componente
    useEffect(() => {
        
        // Usuario del storage
        const user = getStorage('user', true);

        setUser( user )
       
    }, [])  
      
    return (            
        <AppContext.Provider value={{ user, setUser, clearStorage }}>
            {children}
        </AppContext.Provider>  
    );
}

export const AppContext = createContext();