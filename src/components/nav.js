import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'gatsby';

export default () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="basic-navbar-nav justify-content-end" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
        <Nav.Link as={Link} to="/faqs">FAQs</Nav.Link>
        <Nav.Link as={Link} to="/submit-business/">Submit</Nav.Link>
        <Nav.Link as={Link} to="/map">Map</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
