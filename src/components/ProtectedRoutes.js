import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// import {bindActionCreators} from 'redux';
// import * as authActionCreators from '../actions/authActions';
// import auth from '../auth/auth';
import {connect} from 'react-redux';

 function ProtectedRoutes ({component: Component, isAuth, ...rest}) {        
    // const [loaded, setLoaded] = useState(false);
    // const authActions = bindActionCreators(authActionCreators, rest.dispatch)     
    
    // const authValidator = async () => {
    //     await auth.authenticate()
    //     .then(res=>{
    //         setLoaded(true)            
    //         authActions.login(res);
    //         console.log(res, ' res from protected')
    //     })
    // }
    //  useEffect(()=>{        
    //      console.log('hello')
    //      if(!isAuth) {
    //         authValidator();       
    //         return () => {
    //             console.log('componentunmount')
    //             setLoaded(false)
    //         }          
    //      } 
    //  },[isAuth])    
    return (
        <Route 
            {...rest} 
            render={(props)=>{       
                if(!window.localStorage.getItem('token')) {
                    return  <Redirect to={{ path:"/"}}/>                    
                } else {                    
                    return <Component {...props}/>
                }
                
        }} />
    )    
}


export default connect()(ProtectedRoutes);