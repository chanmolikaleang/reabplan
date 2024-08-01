import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAdmin = location.state && location.state.isAdmin;

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand>
        <Link to="/">
          <img
            src="/photos/logo-removebg-preview.png"
            alt="Logo"
            height="75"
            width="100"
            style={{ marginLeft: '100px' }}
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/province">Destination</Nav.Link>
          <Nav.Link href="/schedule">Planning-Trip</Nav.Link>
          {isAdmin && <Nav.Link href="/admin-dashboard">Admin Dashboard</Nav.Link>}
        </Nav>
        <div className="button">
          {isLoggedIn ? (
            <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline-success">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline-danger mx-3">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
