import React, {useContext, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom"
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_ROUTE, VISIT_ROUTE} from "../utils/consts";
import {registration, login} from "../https/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Login = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [_login, setLogin] = useState()
    const [_password, setPassword] = useState()
    const [_gender, setGender] = useState()
    const [_telephone, setTelephone] = useState()
    const [_fullname, setFullname] = useState()
    const [_birthdate, setBirthdate] = useState()
    const [_email, setEmail] = useState()
    const [_conf_password, setConfPassword] = useState()
    const click = async ()=>{
        try {
            let response
            if (isLogin) {
                response = await login(_login, _password)
                user.setUser(response)
                user.setIsAuth(true)
                console.log(user)
                history.push(VISIT_ROUTE)
            } else {
                await registration(_fullname, _birthdate, _gender, _telephone, _email, _login, _password, _conf_password)
                history.push(LOGIN_ROUTE)
            }
        }catch (e){
            alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-md-center"
            style={{height: window.innerHeight - 74}}>
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto">{isLogin? 'Authorization' : 'Registration'}</h2>
                {isLogin ?
                    <Form className="d-flex flex-column">
                        <Form.Control className="mt-3" placeholder="Login" value={_login} onChange={e=>setLogin(e.target.value)}/>
                        <Form.Control type="password" className="mt-3" placeholder="Password" value={_password} onChange={e=>setPassword(e.target.value)}/>
                        <Button onClick={click} className="mt-3" variant={"outline-success"} > Login </Button>
                    </Form>
                    :
                    <Form className="d-flex flex-column">
                        <Form.Control className="mt-3" placeholder="Fullname"value={_fullname} onChange={e=>setFullname(e.target.value)}/>
                        <Form.Control type="date" className="mt-3" placeholder="Birthdate"value={_birthdate} onChange={e=>setBirthdate(e.target.value)}/>
                        <Form.Control className="mt-3" placeholder="Telephone number" value={_telephone} onChange={e=>setTelephone(e.target.value)}/>
                        <Form.Control className="mt-3" placeholder="Email" value={_email} onChange={e=>setEmail(e.target.value)}/>
                        <Form.Control className="mt-3" placeholder="Login" value={_login} onChange={e=>setLogin(e.target.value)}/>
                        <Form.Control type="password" className="mt-3" placeholder="Password" value={_password} onChange={e=>setPassword(e.target.value)} />
                        <Form.Control type="password" className="mt-3" placeholder="Confirm password" value={_conf_password} onChange={e=>setConfPassword(e.target.value)} />
                        <div key={`inline-radio`} className="mt-3">
                            <Form.Check inline label="Male" name="group1" type={"radio"} id={`gender-Male`} value={"M"} checked={_gender === 'M'} onChange={e=>setGender(e.target.value)}/>
                            <Form.Check inline label="Female" name="group1" type={"radio"} value={"F"} id={`gender-Female`} checked={_gender === 'F'} onChange={e=>setGender(e.target.value)}/>
                        </div>
                        <Button onClick={click} className="mt-3" variant={"outline-success"}> Register </Button>
                    </Form>

                }
            </Card>
        </Container>
    )
});

export default Login;