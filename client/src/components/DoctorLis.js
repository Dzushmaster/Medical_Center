import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import DocItem from "./DocItem";

const DoctorLis = observer(() => {
    const {doctor} = useContext(Context)
    return (
       <Row className="d-flex">
           {doctor._doctors.map(type=>
               <DocItem key={type.id} doctor={type}/>
           )}
       </Row>
    )
})

export default DoctorLis;