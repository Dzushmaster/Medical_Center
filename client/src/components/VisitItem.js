import React from 'react';
import {Card, Col} from 'react-bootstrap'
import {useContext} from "react";
import {Context} from "../index";
import {add} from "../https/visitApi";

const VisitItem = ({visit}) => {
    const {user} = useContext(Context)
    const addVisit = async()=>{
        try{
            let response = add(visit.day, visit.begin, visit.end, user._user.id, visit.doctorId)
        }catch(e){
            alert(e)
        }
    }
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