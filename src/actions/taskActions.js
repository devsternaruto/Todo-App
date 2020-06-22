import {getHeaders, baseUrl} from '../config/config';
import * as commonActions from './commonActions'

const fetchTaskListSuccess = (data) => {
    return {
        type : 'FETCH_TASK_LIST_SUCCESS',
        payload : data
    }
}
const addTaskToState = (data) => {    
  return {
      type : 'ADD_TASK_TO_STATE',
      payload : data
  }
}

const deleteTaskToState = (data) => {
  return {
    type : 'DELETE_TASK_TO_STATE',
    payload : data
  }
}

export const changePage = (page) => {
  return {
    type : 'CHANGE_PAGE',
    payload : page
  }
}

export const setPageLimit = (page) => {
  return {
    type : 'SET_PAGE_LIMIT',
    payload : page
  }
}

export const setSortBy = (status) => {
  return {
    type : 'SET_SORT_BY',
    payload : status
  }
}

export const setSearch = (search) => {
  return {
    type : 'SET_SEARCH_VALUE',
    payload : search
  }
}

export const setTaskLoader = (value) => {
  return {
      type : 'SET_TASK_LOADER',
      payload : value
  }
}

export const updateTaskData = (list) => {
  return {
      type : 'UPDATE_TASK_DATA',
      payload : list
  }
}

export const setTaskError = (error) => {
  return {
      type : 'SET_TASK_ERROR',
      payload : error
  }
}


export const fetchTaskList = (page, limit, sortBy, search) => {      
    return async (dispatch) => {      
      console.log('hello')
        dispatch(setTaskLoader(true));
        let queryParams = '?sortBy=createdAt:desc';
        if(page === '') {
          page = 1          
        } 
        if(limit === '' || limit === undefined) {
          limit = 5
        } 

        if(page) {
          queryParams += '&page='+page
        }
        if(limit) {
          queryParams += '&limit='+limit
        }

        if(sortBy || sortBy === false) {
          queryParams += '&completed='+sortBy
        }

        if(search) {
          queryParams += '&search='+search
        }

        await fetch(baseUrl + '/task'+queryParams, {
            method: 'get',
            headers :{
              'Authorization' : getHeaders(),
              'Content-Type': 'application/json'
            }
        }).then(res=>{     
            dispatch(setTaskLoader(false)); 
            return res.json()
        }).then(json=>{       
            dispatch(fetchTaskListSuccess(json))
            return json
        }).catch(e=>{     
            console.log(e, 'eeeeeeeee');
            return e
        })
    } 
}


export const addTask = (formData) => {
  return async (dispatch) => {
    dispatch(setTaskLoader(true));
    fetch(baseUrl + '/task', {
      method: 'POST',
      headers: {
        'Authorization' : getHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res=>{      
        dispatch(setTaskLoader(false));
        return res.json();
    }).then(jsonData=>{            
        if(jsonData.error) {
          dispatch(setTaskError(jsonData.error.message))    
        }else {
          dispatch(addTaskToState(jsonData))      
        }                 
        return jsonData;
    }).catch(e=>{
        dispatch(setTaskLoader(false));
        dispatch(setTaskError(e))    
        return e;
    })
  }
}

export const deleteTask = (id) => {
  return async (dispatch) => {
    dispatch(setTaskLoader(true));
    fetch(baseUrl+'/task/'+id, {
      method : 'DELETE',
      headers: {
        'Authorization': getHeaders(),
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then(res=>{      
        dispatch(setTaskLoader(false));
        return res.json();
    }).then(jsonData=>{      
        if(jsonData.error) {
          dispatch(setTaskError(jsonData.error.message))    
        }else {
          dispatch(deleteTaskToState(jsonData))         
        }                 
        return jsonData;
    }).catch(e=>{
      console.log(e, 'error')
    })
  }
}


export const  setTaskCompleteToggle = (id, checked) => {

  return async (dispatch) => {        
      fetch(baseUrl+'/task/'+id , {
          method : 'PATCH',
          headers: {
            'Authorization': getHeaders(),
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            "completed" : checked,              
          })
        }).then(res=>{                       
          return res.json() 
        }).then(jsonData=>{
            // dispatch(updateTaskData(json)) 
            if(jsonData.error) {
              dispatch(setTaskError(jsonData.error.message))    
            }else {
              //dispatch(updateTaskData(jsonData));                 
            }  
            return jsonData
        }).catch(e=>{
          return e      
        })
  }     
}



export  const saveTaskData = (id, description) => {    
    return async (dispatch) => {
        dispatch(setTaskLoader(true));
        return fetch(baseUrl+'/task/'+id, {
            method : 'PATCH',
            headers: {
              'Authorization': getHeaders(),
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              "description" : description,              
            })
          }).then(res=>{            
            return res.json();   
          }).then(jsonData=>{
            dispatch(setTaskLoader(false));

            if(jsonData.error) {
              dispatch(setTaskError(jsonData.error.message))    
            }else {
              dispatch(updateTaskData(jsonData));                 
            }                        
            return jsonData            
          }).catch(e=>{
            dispatch(setTaskLoader(false));
            return e      
          })
    } 
  }  