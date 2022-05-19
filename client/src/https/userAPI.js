import {$authHost, $host} from './index'
import jwtDecode from "jwt-decode";
export const registration = async (fullname, birthdate, gender, telenumber, email, login, password, rep_pass)=>{
    console.log(gender)
    const {data} = await $host.post('/api/user/register', {fullname, birthdate, gender, telenumber, email, login, password, rep_pass})
    return jwtDecode(data.accessToken)
}
export const login = async (login, password)=>{
    const {data} = await $host.post('/api/user/login', {login, password})
    return jwtDecode(data.accessToken)
}