// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onShowLogin, onShowSignup, onLogout, onShowCart, onShowBooking }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
<<<<<<< Updated upstream
    <Navbar bg="danger" variant="dark" expand="lg" fixed="top">
=======
<<<<<<< HEAD
    <Navbar expand="lg" fixed="top">
=======
    <Navbar bg="danger" variant="dark" expand="lg" fixed="top">
>>>>>>> 8b271ebbec92519329d01698e5d7ef67e6eb3f6f
>>>>>>> Stashed changes
      <Navbar.Brand as={NavLink} to="/">
        Club Curry
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/" end>
            Home
          </Nav.Link>
          <Button variant="outline-light" onClick={onShowCart} className="mr-2">
            <i className="fas fa-shopping-cart"></i> Cart
          </Button>
          <Button variant="outline-light" onClick={onShowBooking}>
            <i className="fas fa-calendar-alt"></i> Book a Table
          </Button>
        </Nav>
        <div className="ml-auto buttons-container">
          {isLoggedIn ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline-light" onClick={onShowLogin} className="mr-2">
                Login
              </Button>
              <Button variant="outline-light" onClick={onShowSignup}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
