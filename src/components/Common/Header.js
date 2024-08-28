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
    <Navbar bg="danger" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand as={NavLink} to="/">
        {/* Replace text with logo image */}
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}  // Path to the logo image
          alt="Club Curry Logo"
          height="40"  // Adjust the height as needed
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" end>
            <i className="fas fa-home"></i>

          </Nav.Link>
          <Button variant="outline-light" onClick={onShowCart} className="ml-2">
            <i className="fas fa-shopping-cart"></i> Cart
          </Button>
          <Button variant="outline-light" onClick={onShowBooking} className="ml-2">
            <i className="fas fa-calendar-alt"></i> Book a Table
          </Button>
        </Nav>
        <div className="buttons-container">
          {isLoggedIn ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline-light" onClick={onShowLogin} className="ml-2">
                Login
              </Button>
              <Button variant="outline-light" onClick={onShowSignup} className="ml-2">
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
