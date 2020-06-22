import {baseUrl, getHeaders} from '../config/config';
import * as commonActions from './commonActions'

export const getToken = () => {
    return window.localStorage.getItem('token');
}

export const setAuthLoader = (value) => {
    return {
        type : 'SET_AUTH_LOADER',
        payload : value
    }
}

export const authenticate = () => {
    return async (dispatch) => {
        dispatch(setAuthLoader(true))
        return fetch(baseUrl + '/users/me', {
            method: 'get',
            headers: {
                'Authorization': getHeaders()
            },
        }).then(res=>{                          
            return res.json();
        }).then(json=>{
            dispatch(login({user : json, token : getToken()}));
            dispatch(setAuthLoader(false)) 
            return json; 
        }).catch(e=>{     
            console.log(e, 'e auth')               
            return e;
        })
    }
}

export const signIn = (formData) => {
    return async (dispatch) => {
        dispatch(setAuthLoader(true))
        return fetch(baseUrl + '/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(formData)
        })
        .then(res=>{              
            return res.json()
        })
        .then(jsonData=>{            
            dispatch(setAuthLoader(false))
            if(jsonData.error) {
                dispatch(commonActions.setError(jsonData.error.message))    
            }else {
                window.localStorage.setItem('token', jsonData.token);   
                dispatch(login({user:jsonData.user, token : jsonData.token}));
                
            }            
            return jsonData            
        }).catch(e=>{
            dispatch(setAuthLoader(false))
            dispatch(commonActions.setError('Failed to load'))    
            return e
        });
    }
}

export const signUp = (formData) => {    
    return async (dispatch) => {
        dispatch(setAuthLoader(true))
        return fetch(baseUrl + '/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(res=> {                            
              return res.json()
          })
          .then(jsonData=>{
            dispatch(setAuthLoader(false))

            if(jsonData.error) {
                dispatch(commonActions.setError(jsonData.error.message))    
            }else {                
                const localStorage = window.localStorage;
                localStorage.setItem('token', jsonData.token);                   
                dispatch(login({user : jsonData.user, token : jsonData.token}));                
            }            
            return jsonData
          }).catch(e=>{
            dispatch(setAuthLoader(false))
            dispatch(commonActions.setError('Failed to load'))    
            return e
          });
    }
}

export const signout = () => {
    return async (dispatch) => {
        dispatch(setAuthLoader(true))
        return fetch(baseUrl + '/users/logout', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
        })
        .then(res=>{            
            dispatch(setAuthLoader(false))
            window.localStorage.removeItem('token');   
            dispatch(logout());                 
            return res                                                           
        })
        .catch(e=>{
            dispatch(setAuthLoader(false))
            dispatch(commonActions.setError('Failed to load'))    
            return e
        });  
    }
}

export const login = (data) => {    
    return { 
        type: 'login', 
        payload : data 
    }
}

export const logout = () => {    
    return { 
        type: 'logout', 
    }
}

export const updateUserAction = (data) => {    
    return { 
        type: 'updateUser', 
        payload : data.user
    }
}

export const updateUserAvatar = (data) => {    
    return { 
        type: 'updateAvatar', 
        payload : data
    }
}




