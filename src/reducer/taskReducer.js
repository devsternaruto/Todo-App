const initState = {
    taskList : [],
    count : '',
    limit : 5,
    page : 1,
    sortBy : 'all',
    search : '',
    loader:false, 
    errorMessage : '',
    totalCount : ''
}

const taskReducer = (state = initState, action ) => {
    const uState = {...state}    
    switch (action.type) {
        case 'FETCH_TASK_LIST_SUCCESS' :         
            uState.taskList = action.payload.tasks;
            uState.count = action.payload.count;
            uState.totalCount = action.payload.totalCount  
            return uState
        case 'ADD_TASK_TO_STATE' : 
            uState.taskList = [action.payload, ...uState.taskList]
            return uState;
        case 'DELETE_TASK_TO_STATE' : 
            uState.taskList = uState.taskList.filter(el=>{
                return el._id !== action.payload._id
            })
            return uState;
        case 'UPDATE_TASK_DATA' :
            uState.taskList = uState.taskList.map(el=>{                    
                 return el._id === action.payload._id ? {...el, completed : action.payload.completed, description : action.payload.description} : el;
            })
            return uState;
        case 'CHANGE_PAGE' : 
            uState.page = action.payload
            return uState;
        case 'SET_PAGE_LIMIT' : 
            uState.limit = action.payload
            return uState;      
        case 'SET_SORT_BY' : 
            uState.sortBy = action.payload
            return uState;      
        case 'SET_SEARCH_VALUE' : 
            uState.search = action.payload
            return uState; 
        case 'SET_TASK_LOADER' : 
            console.log('hello')
            uState.loader = action.payload
            return uState; 
        case 'SET_TASK_ERROR' : 
            uState.errorMessage = action.payload
            return uState;         
        case 'logout' :             
            uState.taskList = []
            uState.count = 0
            uState.totalCount = 0
            return uState;     
        default : 
            return state 
    }
}

export default taskReducer;