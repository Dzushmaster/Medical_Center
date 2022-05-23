import {$authHost, $host} from "./index"
export const add = async (date, begin, end, userId, docId) =>{
    const {data} = await $authHost.post('/api/visit/', {date, begin, end, userId, docId})
    console.log(data)
}
export const getAll = async (id) =>{
    const {data} = await $authHost.get(`/api/visit/:${id}`)
    console.log(data)
}