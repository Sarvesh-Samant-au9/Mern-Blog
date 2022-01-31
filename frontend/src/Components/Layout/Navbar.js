import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import authContext from "../../Context/Auth/AuthContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const NavbarComponent = () => {
  const { user, loadUser, isAuthenticated, logoutUser } =
    useContext(authContext);

  useEffect(() => {
    loadUser();
  }, []);
  console.log(isAuthenticated);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" sticky="top" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/blogs/new">
                  Write
                </Nav.Link>
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
