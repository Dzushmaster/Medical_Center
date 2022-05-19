import axios from 'axios'
import jsonRoute from '../routes.json'
const $host = axios.create({
    baseURL: jsonRoute.REACT_APP_API_URL
})
const $authHost = axios.create({
    baseURL:jsonRoute.REACT_APP_API_URL
})
const authInterceptor = config=>{
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
}
$authHost.interceptors.request.use(authInterceptor)
export {$host, $authHost}