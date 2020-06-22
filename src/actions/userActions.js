import {getHeaders, baseUrl} from '../config/config';
import {updateUserAction, updateUserAvatar, logout} from './authActions';
import {setCommonLoader} from './commonActions';

export const setAuthError = (error) => {
    return {
        type : 'SET_AUTH_ERROR',
        payload : error
    }
}

export const setAuthSuccess = (value) => {
    return {
        type : 'SET_AUTH_SUCCESS',
        payload : value
    }
}

export const setSuccessMessage = (value) => {
    return {
        type : 'SET_SUCCESS_MESSAGE',
        payload : value
    }
}

export const setErrorMessage = (value) => {
    return {
        type : 'SET_ERROR_MESSAGE',
        payload : value
    }
}

export const setProfileImageLoader = (value) => {
    return {
        type : 'SET_PROFILE_IMAGE_LOADER',
        payload : value
    }
}

export const deleteAccountAction = () => {
    return (dispatch) => {
        dispatch(setCommonLoader(true));
        return fetch(baseUrl + '/users/me', {
            method : 'DELETE',
            headers :{
                'Authorization' : getHeaders(),
            }
        }).then(res=>{                              
            return res.json();
        }).then(jsonData=>{            
            if(jsonData.error) {
                dispatch(setErrorMessage(jsonData.error.message));  
            } else {
                window.localStorage.removeItem('token');     
                dispatch(logout())               
                dispatch(setSuccessMessage(jsonData.success.message));    
            } 
            dispatch(setCommonLoader(false));
            return jsonData            
        }).catch(e=>{
            dispatch(setCommonLoader(false));
            return e;
        })
    }
}



export const updateUser = (userData) => {
    return (dispatch)=> {
        fetch(baseUrl+'/users/me', {
            method : 'PATCH',
            headers :{
                'Authorization' : getHeaders(),
                'Content-Type': 'application/json'
              },
           body: JSON.stringify(userData)            
        }).then(res=>{      
            return res.json();
        }).then(jsonData=>{            
            if(jsonData.error) {
                dispatch(setAuthError(jsonData.error.message));  
            } else {
                dispatch(setAuthSuccess(jsonData.success.message));
                dispatch(updateUserAction(jsonData))   
            }             
            return jsonData;
        }).catch(e=>{
            return e
        });
    }
}

export const addProfileAction = (data) => {
    return (dispatch) => {
        dispatch(setProfileImageLoader(true));
        return fetch(baseUrl + '/users/me/avatar', {
            method : 'POST',
            headers :{
                'Authorization' : getHeaders(),
            },
            body : data           
        }).then(res=>{                              
            return res.json();
        }).then(jsonData=>{            
            if(jsonData.error) {
                dispatch(setErrorMessage(jsonData.error.message));  
            } else {
                dispatch(setSuccessMessage(jsonData.success.message));    
                dispatch(updateUserAction(jsonData))               
            } 
            dispatch(setProfileImageLoader(false));
            return jsonData            
        }).catch(e=>{
            dispatch(setProfileImageLoader(false));
            console.log(e);
            return e;
        })
    }
}

export const removeProfilePictureAction = (data) => {
    return (dispatch) => {
        dispatch(setProfileImageLoader(true));
        return fetch(baseUrl + '/users/me/avatar', {
            method : 'DELETE',
            headers :{
                'Authorization' : getHeaders(),
            }
        }).then(res=>{                              
            return res.json();
        }).then(jsonData=>{            
            if(jsonData.error) {
                dispatch(setErrorMessage(jsonData.error.message));  
            } else {
                dispatch(setSuccessMessage(jsonData.success.message));    
                dispatch(updateUserAction(jsonData))               
            } 
            dispatch(setProfileImageLoader(false));
            return jsonData            
        }).catch(e=>{
            dispatch(setProfileImageLoader(false));
            console.log(e);
            return e;
        })
    }
}


export const getAvatar = (id) => {
    return (dispatch) => {
        fetch(baseUrl+'/users/'+id+'/avatar', {
            method : 'GET'
        }).then(res=>{
            dispatch(updateUserAvatar(res));
            return res 
        })
    }
}