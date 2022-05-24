import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Container, Form} from "react-bootstrap";
import {setAnalyse} from "../https/homeAnalyseApi";

const HomeAnalyse = observer(() => {
    const {user} = useContext(Context)
    const [_date, setDate] = useState()
    const [_pulse, setPulse] = useState()
    const [_temperature, setTemperature] = useState()
    const [_blood_press, setBlood_press] = useState()
    const sendData = async ()=>{
        try {
            setAnalyse(user._user.id, _pulse, _temperature, _blood_press, _date)
        }catch(e){
            alert(e)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-md-center"
            style={{height: window.innerHeight - 74}}>
            <Card style = {{width: 600}} className="p-5">
                <label className="mt-3">Пульс</label>
                <Form.Control type="number"  placeholder="Пульс" value={_pulse} onChange={e=>setPulse(e.target.value)}/>
                <label className="mt-3">Температура</label>
                <Form.Control type="number"  placeholder="Темпаратура °С" value={_temperature} onChange={e=>setTemperature(e.target.value)}/>
                <label className="mt-3">Давление</label>
                <Form.Control placeholder="Давление (Число/Число формат)" value={_blood_press} onChange={e=>setBlood_press(e.target.value)}/>
                <label className="mt-3">Дата измерения</label>
                <Form.Control type="date" placeholder="Дата измерения"value={_date} onChange={e=>setDate(e.target.value)}/>
                <Button onClick={sendData} className="mt-3" variant={"success"}>Отправить</Button>
            </Card>

        </Container>
    );
});

export default HomeAnalyse;