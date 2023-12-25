// Routes.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import App from '../App/App';
import About from '../About/About';
import Contact from '../Contact/Contact';
import logo from "../assets/memeops_logo.png";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg"  className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
        <img
            src={logo}  
            width="100"
            height="100"
            className="d-inline-block align-top"
            alt="MemeOps Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="nav-link-txt" as={Link} to="/">Home</Nav.Link>
            <Nav.Link className="nav-link-txt" as={Link} to="/about">About</Nav.Link>
            <Nav.Link className="nav-link-txt" as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default Navigation;
