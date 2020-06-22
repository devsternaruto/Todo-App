const initState = {
    isAuth : false,
    user : null,
    loader : false,
    errorMessage: '',
    successMessage : '',
    gErrorMessage: '',
    gSuccessMessage : '',
    profileImageLoader : false
}

const authReducer = (state = initState, action ) => {
    // console.log(action, 'action')
    const uState = {...state}    
    switch (action.type) {
        case 'login' :
            uState.user = action.payload.user;
            uState.isAuth = action.payload.token ? true : false 
            return uState;
        case 'updateUser' :    
        console.log('updateUser')        
            uState.user = action.payload;
            return uState;
        case 'logout' :            
            uState.user = null;
            uState.isAuth = false             
            return uState;       
        case 'SET_AUTH_LOADER' :
            uState.loader = action.payload;                
            return uState;        
        case 'setError' :
            uState.errorMessage = action.payload;                
            return uState;
        case 'SET_AUTH_ERROR' :            
            uState.errorMessage = action.payload;                
            return uState;
        case 'SET_AUTH_SUCCESS' :
            uState.successMessage = action.payload;                
            return uState;
        case 'clearError' :
            uState.errorMessage = '';                
            return uState;   
        case 'SET_SUCCESS_MESSAGE' :        
            uState.gSuccessMessage = action.payload;        
            return uState;                       
        case 'SET_ERROR_MESSAGE' :
            uState.gErrorMessage = action.payload;        
            return uState;     
        case 'SET_PROFILE_IMAGE_LOADER' :
            uState.profileImageLoader = action.payload;        
            return uState;               
          
        default : 
            return state 
    }
}

export default authReducer;