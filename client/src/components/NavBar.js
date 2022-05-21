import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {
    CONSULTATION_ROUTE,
    HOMEANALYSE_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    VISIT_ROUTE
} from "../utils/consts";
const NavBar = observer(() => {
    const history = useHistory()
    function getLogin(){
        history.push(LOGIN_ROUTE)
    }
    function getRegister(){
        history.push(REGISTER_ROUTE)
    }
    function getTickets(){
        history.push(VISIT_ROUTE)
    }
    function getHomeAnalyse(){
        history.push(HOMEANALYSE_ROUTE)
    }
    function getChat(){
        history.push(CONSULTATION_ROUTE)
    }
    const {user} = useContext(Context)
    return (
            <Navbar bg="success" variant="dark">
                <Container >
                    <NavLink className="mx-auto">
                        {user.isAuth ?
                            <Nav>
                                <Button onClick={getTickets} variant={"outline-dark"} >Tickets</Button>
                                <Button onClick={getHomeAnalyse} variant={"outline-dark"} className="mx-1">Home analyses</Button>
                                <Button variant={"outline-dark"} >Log out</Button>
                                <Button onClick={getChat} variant={"outline-dark"} className="mx-1">Consultation</Button>
                            </Nav>
                            :
                            <Nav>
                                <Button onClick={getLogin} variant={"outline-dark"} className="mx-1">Open login</Button>
                                <Button onClick={getRegister} variant={"outline-dark"} >Open register</Button>
                            </Nav>
                        }
                    </NavLink>
                </Container>
            </Navbar>
            );
});

export default NavBar;