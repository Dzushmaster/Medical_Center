import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Container, Form} from "react-bootstrap";
import {setAnalyse} from "../https/homeAnalyseApi";
import {useHistory} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const HomeAnalyse = observer(() => {
    const {user} = useContext(Context)
    const [_date, setDate] = useState()
    const [_pulse, setPulse] = useState()
    const [_temperature, setTemperature] = useState()
    const [_blood_press, setBlood_press] = useState()
    const history = useHistory()
    const sendData = async ()=>{
        try {
            await setAnalyse(user._user.id, _pulse, _temperature, _blood_press, _date)
        }catch(e){
            alert(e.response.data.message)
            history.push(LOGIN_ROUTE)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-md-center"
            style={{height: window.innerHeight - 74}}>
            <Card style = {{width: 600}} className="p-5">
                <label className="mt-3">Pulse</label>
                <Form.Control type="number"  placeholder="Pulse" value={_pulse} onChange={e=>setPulse(e.target.value)}/>
                <label className="mt-3">Temperature</label>
                <Form.Control type="number"  placeholder="Temperature °С" value={_temperature} onChange={e=>setTemperature(e.target.value)}/>
                <label className="mt-3">Blood press</label>
                <Form.Control placeholder="Blood press (Number/Number format)" value={_blood_press} onChange={e=>setBlood_press(e.target.value)}/>
                <label className="mt-3">Data</label>
                <Form.Control type="date" placeholder="Date"value={_date} onChange={e=>setDate(e.target.value)}/>
                <Button onClick={sendData} className="mt-3" variant={"success"}>Send</Button>
            </Card>

        </Container>
    );
});

export default HomeAnalyse;