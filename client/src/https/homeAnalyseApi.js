import {$host} from './index'
export const setAnalyse = async(id, pulse, temperature, blood_press, date)=>{
    if(temperature === '') temperature = .0
    if(pulse === '') pulse = 0
    const {data} = await $host.post('/api/hAnalyse', {id, pulse, temperature, blood_press, date})
    return data
}