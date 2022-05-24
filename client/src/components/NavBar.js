import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {
    CHAT_ROUTE,
    CONSULTATION_ROUTE,
    HOMEANALYSE_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    VISIT_ROUTE
} from "../utils/consts";
import {destroy} from "../https/userAPI";
const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    console.log(history)
    const isChat = CHAT_ROUTE === useHistory().location.pathname
    function getLogin(){
        if(!isChat) history.push(LOGIN_ROUTE)
        else alert('Exit from chat')
    }
    function getRegister(){
        if(!isChat) history.push(REGISTER_ROUTE)
        else alert('Exit from chat')
    }
    function getTickets(){
        if(!isChat) history.push(VISIT_ROUTE)
        else alert('Exit from chat')
    }
    function getHomeAnalyse(){
        if(!isChat) history.push(HOMEANALYSE_ROUTE)
        else alert('Exit from chat')
    }
    function getChat(){
        if(!isChat) history.push(CONSULTATION_ROUTE)
        else alert('Exit from chat')
    }
    async function deleteUser(){
        try{
            let response = destroy(user._user.id)
            logout()
        }catch(e){
            alert('Error: cant delete this user')
        }
    }
    function logout(){
        if(!isChat) {
            user.setUser({})
            user.setIsAuth(false)
            history.push(LOGIN_ROUTE)
        }
        else alert('Exit from chat')
    }

    return (
            <Navbar bg="success" variant="dark">
                <Container >
                    <NavLink className="mx-auto">
                        {user.isAuth ?
                            <Nav>
                                <Button onClick={getTickets} variant={"outline-dark"}>Tickets</Button>
                                <Button onClick={getHomeAnalyse} variant={"outline-dark"} className="mx-1">Home analyses</Button>
                                <Button onClick={logout} variant={"outline-dark"} >Log out</Button>
                                <Button onClick={getChat} variant={"outline-dark"} className="mx-1">Consultation</Button>
                                <Button onClick={deleteUser} variant={"outline-danger"} >Delete account</Button>
                            </Nav>
                            :
                            <Nav>
                                <Button onClick={getLogin} variant={"outline-dark"} className="mx-1">Open login</Button>
                                <Button onClick={getRegister} variant={"outline-dark"} >Open register</Button>
                                <Button onClick={getChat} variant={"outline-dark"} className="mx-1">Consultation</Button>
                            </Nav>
                        }
                    </NavLink>
                </Container>
            </Navbar>
            );
});

export default NavBar;