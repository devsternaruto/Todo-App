export const setCommonLoader = (value) => {
    return {
        type : 'COMMON_LOADER',
        payload : value
    }
}

export const setError = (message) => {
    console.log(message, 'message')
    return {
        type : 'setError',
        payload : message
    }
}

export const clearError = () => {    
    return {
        type : 'clearError',
    }
}


