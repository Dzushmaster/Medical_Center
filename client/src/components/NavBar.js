import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory, useLocation} from "react-router-dom";
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
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const isChat = location.pathname === CHAT_ROUTE
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
        if(!isChat) {
            try{
                let response = await destroy(user._user.id)
                logout()
            }catch(e){
                alert('Error: cant delete this user')
            }
        }
        else alert('Exit from chat')
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
            <Navbar bg="success" variant="light">

                    <NavLink className="mx-auto">
                        { user.isAuth ?
                            <Nav>
                                <Button onClick={getTickets} variant={"outline-dark"}>Tickets</Button>
                                <Button onClick={getHomeAnalyse} variant={"outline-dark"} className="mx-1">Home analyses</Button>
                                <Button onClick={getChat} variant={"outline-dark"} className="mx-1">Consultation</Button>
                                <Button onClick={logout} variant={"outline-dark"} >Log out</Button>
                                <Button onClick={deleteUser} variant={"outline-danger"} className="mx-1">Delete account</Button>
                            </Nav>
                            :
                            <Nav>
                                {   isLogin?
                                    <Button onClick={getRegister} variant={"outline-dark"} className="mx-1">Register</Button>
                                    :
                                    <Button onClick={getLogin} variant={"outline-dark"} className="mx-1">Login</Button>
                                }
                                <Button onClick={getTickets} variant={"outline-dark"}>Tickets</Button>
                                <Button onClick={getHomeAnalyse} variant={"outline-dark"} className="mx-1">Home analyses</Button>
                                <Button onClick={getChat} variant={"outline-dark"}>Consultation</Button>
                            </Nav>
                        }
                    </NavLink>
            </Navbar>
            );
});

export default NavBar;