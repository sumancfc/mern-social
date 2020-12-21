import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const NavbarItem = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>React</Navbar.Brand>
        <Nav className='ml-auto'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
          <Link to='/signup' className='nav-link'>
            Signup
          </Link>
          <Link to='/signin' className='nav-link'>
            Signin
          </Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavbarItem;
