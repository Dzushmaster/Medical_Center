import React from 'react';
import {Card, Col} from 'react-bootstrap'
import {useContext} from "react";
import {Context} from "../index";
import {add} from "../https/visitApi";
import {useHistory} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const VisitItem = observer(({visit}) => {
    const {user} = useContext(Context)
    const history = useHistory()
    const addVisit = async()=>{
        try{
            let response = await add(visit.day, visit.begin, visit.end, user._user.id, visit.doctorId)
        }catch(e){
            alert(e.response.data.message)
            history.push(LOGIN_ROUTE)
        }
    }
    return (
        <Col md={4} className="mt-4" onClick={addVisit}>
            <Card style={{cursor:"pointer"}}>
                <div className="d-flex justify-content-between align-items-center">
                    Day: {visit.date}<br/>
                    Begin: {visit.begin}<br/>
                    End: {visit.end}
                </div>
            </Card>
        </Col>
    );
});

export default VisitItem;