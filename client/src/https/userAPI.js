import {$authHost, $host} from './index'
import jwtDecode from "jwt-decode";
export const registration = async (fullname, birthdate, gender, telenumber, email, login, password, rep_pass)=>{
    const {data} = await $host.post('/api/user/register', {fullname, birthdate, gender, telenumber, email, login, password, rep_pass})
}
export const login = async (login, password)=>{
    const {data} = await $host.post('/api/user/login', {login, password})
    localStorage.setItem('accessToken', data.accessToken)
    return jwtDecode(data.accessToken)
}
export const check = async()=>{
    const {data} = await $authHost.get('/api/user/auth')
    localStorage.setItem('accessToken', data.accessToken)
    return jwtDecode(data.accessToken)
}