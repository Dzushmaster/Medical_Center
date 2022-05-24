import React, {useContext} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import SpecBar from "../components/SpecBar";
import DoctorLis from "../components/DoctorLis";

const Visit = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="mt-4" md={2}>
                    <SpecBar/>
                </Col>
                <Col md={9}>
                    <DoctorLis/>
                </Col>
            </Row>
        </Container>
    );
};

export default Visit;