import React from 'react';
import {Route, Redirect} from 'react-router-dom';

 function PublicRoutes ({component: Component, isAuth, ...rest}) {        
    return (
        <Route 
            {...rest} 
            render={(props)=>{       
                if(window.localStorage.getItem('token')) {
                    return  <Redirect to={{ path:"/"}}/>                    
                } else {                    
                    return <Component {...props}/>
                }
                
        }} />
    )    
}


export default PublicRoutes;