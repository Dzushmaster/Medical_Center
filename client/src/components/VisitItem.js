import React from 'react';
import {Card, Col} from 'react-bootstrap'
import {useContext} from "react";
import {Context} from "../index";
import {add} from "../https/visitApi";

const VisitItem = ({visit}) => {
    const {user} = useContext(Context)
    const {doctor} = useContext(Context)
    const _doctor = doctor._doctors.find(doc=>doc.id === visit.docId)
    const addVisit = async()=>{
        try{
            let response = add({date: visit.date, begin: visit.begin, end: visit.end, userId: user.user.id, docId: _doctor.id})
        }catch(e){
            alert(e.response.data.message)
        }
    }
    //onclicck post запрос на добавление в таблицу visit
    return (
        <Col md={4} className="mt-4" onClick={addVisit}>
            <Card style={{cursor:"pointer"}}>
                <div className="d-flex justify-content-between align-items-center">
                    День: {visit.date}<br/>
                    Начало: {visit.begin}<br/>
                    Конец: {visit.end}
                </div>
            </Card>
        </Col>
    );
};

export default VisitItem;