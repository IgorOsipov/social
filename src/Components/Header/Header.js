import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
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
                <Nav className="mr-auto flex-grow-1 justify-content-around" defaultActiveKey="/home">
                    <Nav.Link href="/home">Profile</Nav.Link>
                    <Nav.Link href="/messages">Messages</Nav.Link>
                    <Nav.Link href="/news">News</Nav.Link>
                    <Nav.Link href="/music">Music</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
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