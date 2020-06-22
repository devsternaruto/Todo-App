export  const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getHeaders = () => {
    return  ('Bearer ' + window.localStorage.getItem('token'))
}