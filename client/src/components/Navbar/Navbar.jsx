import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

import './navbar.css';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="nav">
      <Container>
        <Navbar.Brand href="/">Striver</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="/accountPage"> Account </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
