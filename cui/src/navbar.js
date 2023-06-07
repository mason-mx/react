import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./navbar.scss";

function CNavbar(props) {
  const [active, setActive] = useState('default');
  return (
    <header>
      <Navbar className="c-navbar" expand="lg" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="https://github.com/mason-mx">
              <img
                alt=""
                src="logo.svg"
                width="99"
                height="auto"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={active} onSelect={(selectedKey) => setActive(selectedKey)}>
              <Nav.Link href="#" onClick={() => {props.callHome();}} eventKey="default">Instrument View</Nav.Link>
              <Nav.Link href="#" eventKey="sys_settings">System Settings</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="#" target="_blank">Info</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default CNavbar;