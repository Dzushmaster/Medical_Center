import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {DOCTOR_ROUTE} from "../utils/consts";

const DocItem = ({doctor}) => {
    const history = useHistory()
    return (
        <Col md={3} className="mt-4" onClick={()=> history.push(DOCTOR_ROUTE + '/' + doctor.id)}>
            <Card style={{width: 250, cursor:"pointer"}} border={"dark"}>
                <div className="d-flex justify-content-between align-items-center">
                    Fullname: {doctor.fullname}<br/>
                    Speciality: {doctor.speciality}<br/>
                    Experience: {doctor.experience}<br/>
                </div>
            </Card>
        </Col>
    );
};

export default DocItem;