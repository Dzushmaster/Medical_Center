import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
const SpecBar = observer(() => {
    const {doctor} = useContext(Context)
    return (
        <div>
            <ListGroup>
                {doctor._doctors.map(type=>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={type.id === doctor.getSelectDoc().id}
                        onClick={()=> doctor.setSelectDoc(type)}
                        key={type.id}
                    >
                        {type.speciality}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    )
})

export default SpecBar;