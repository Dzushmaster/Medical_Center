import React, {useContext, useEffect} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import VisitItem from "../components/VisitItem";
import {useHistory} from "react-router-dom";
import {getAll} from "../https/visitApi";
const VisitPage = observer(() => {
    const docId = useHistory().location.pathname.split('/')[2]
    const {visit} = useContext(Context)

    useEffect(()=>{
        setTimeout(()=>{getAll(docId).then(data=> {visit.setVisit(data.filter(datum => datum.busy != 1))})
        }, 2000)

    })
    const {doctor} = useContext(Context)
    const _doctor = doctor._doctors.find(doc=>doc.id == docId)
    return (
        <Container fluid>
            <Col>
                <Row>
                    <h2>{_doctor.fullname} {_doctor.speciality} {visit._visites.cabinet}</h2>
                </Row>
                <Row>
                    <Col>
                        <Row>
                        {visit._visites.map(info=>
                            <VisitItem key={info.id} visit = {info} docId = {docId}/>
                        )}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Container>

    );
})

export default VisitPage;