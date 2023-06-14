import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/Logo.png';
import Av1 from '../Assets/av1.jpg'
import Cookies from 'js-cookie';

const NavComp = () => {
    const navigate = useNavigate()

    const Logout = () => {
        if(document.getElementById('log').innerHTML==='Logout'){
            Cookies.remove('processid')
            navigate('/')
        }
    }

  return (
    <>
        <div style={{width:"100vw",position:"fixed",zIndex:100}} className='d-flex justify-content-center p-3' >
            <div className='nav-container rounded rounded-4'>
            <Navbar variant={'dark'} expand="sm" className='h5' style={{ fontFamily: "QuickSand", }}>
                <Container className='rb'>
                <Navbar.Brand as={Link} to='/'>
                    <img
                    alt="Anits Logo"
                    src={Logo}
                    width="80"
                    height="50"
                    className="d-inline-block align rounded-5"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse>
                    <Nav className='ms-auto'>
                    <Nav.Link href='/games'>Games</Nav.Link>
                    <Nav.Link href='/signup'  >SignUp</Nav.Link>
                    <Nav.Link id='log' href={Cookies.get('processid')?`/`:`/login`} onClick = {Logout}>{Cookies.get('processid')?'Logout':'Login'}</Nav.Link>
                    <Nav.Item style={{cursor:"pointer"}}>
                        <img src={Av1} style={{width:40}} className="rounded rounded-5 ms-5" onClick={() => window.location.replace('/profile')} alt="Card" />
                    </Nav.Item>
                    </Nav> 
                </Navbar.Collapse>
                </Container>
            </Navbar>
            </div> 
        </div>
    </>
  );
};

export default NavComp;
