import {$authHost, $host} from "./index"
export const add = async (date, begin, end, userId, docId) =>{
    console.log(date)
    const {data} = await $host.post('/api/visit/', {date, begin, end, userId, docId})
    console.log(data)
}
export const getAll = async (id) =>{
    const {data} = await $host.get(`/api/visit/:${id}`)
    console.log(data)
}