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
        <Nav className="justify-content-end">
          {currentUser ? (
            <Button variant="outline-danger" onClick={logout}>
              Log Out
            </Button>
          ) : (
            <Nav.Link href="/login">
              <Button variant="outline-info" onClick={logout}>
                Log In
              </Button>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
