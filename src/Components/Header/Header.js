import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../Img/logo.png';


const Header = () => {
    return (
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">
                <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav">
                <Nav className="mr-auto flex-grow-1" style={{justifyContent: 'space-evenly'}}>
                    <LinkContainer to="/profile"><Nav.Link>Profile</Nav.Link></LinkContainer>
                    <LinkContainer to="/dialogs"><Nav.Link>Messages</Nav.Link></LinkContainer>
                    <LinkContainer to="/news"><Nav.Link>News</Nav.Link></LinkContainer>
                    <LinkContainer to="/music"><Nav.Link>Music</Nav.Link></LinkContainer>
                    <LinkContainer to="/settings"><Nav.Link>Settings</Nav.Link></LinkContainer>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

        
    )
}

export default Header;