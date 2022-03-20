import React from 'react';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import AuthContext from '../AuthContext';

import './navbar.css';

const NavBar = () => {
  const { logout, currentUser } = AuthContext.useAuth();

  return (
    <Navbar bg="dark" variant="dark" className="nav">
      <Container>
        <Navbar.Brand href="/">Striver</Navbar.Brand>
        {currentUser && (
          <Nav className="justify-content-end">
            <Button variant="outline-danger" onClick={logout}>
              Log Out
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
