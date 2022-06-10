/* eslint-disable import/no-cycle */
import {useContext} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {ADMIN_ROUTE, LOGIN_ROUTE, HOME_ROUTE} from "../utils/consts";
import {Context} from "../index";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setRoles([])
        user.setIsAuth(false)
    }
    
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={HOME_ROUTE}>ТурФирма</NavLink>
                {user.isAuth ?
                     <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant="outline-light"
                            onClick={() => navigate(ADMIN_ROUTE, {replace: true})}
                        >
                            Личный кабинет
                        </Button>
                        <Button
                            variant="outline-light"
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE, {replace: true})}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;