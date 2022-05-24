import {$authHost, $host} from "./index"
export const add = async (date, begin, end, id, idDoc) =>{
    const {data} = await $host.post('/api/visit/', {date: date, begin: begin, end: end, id: id, idDoc: idDoc})
}
export const getAll = async (id) =>{
    const {data} = await $host.get(`/api/visit/:${id}`)
    return data
}