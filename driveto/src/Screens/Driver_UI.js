import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CabDriver() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    // Clear token or perform any necessary logout logic
    localStorage.removeItem('token');
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Cab Driver Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleNavigation('/newrides')}>New Rides</Nav.Link>
              <Nav.Link onClick={() => handleNavigation('/pastrides')}>Past Rides</Nav.Link>
              <Nav.Link onClick={() => handleNavigation('/payments')}>Payments</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Section */}
      <Container className="mt-5">
        <h2>Welcome, Cab Driver!</h2>
        <p>Select an option from the navbar to get started with your rides or payments.</p>
      </Container>
    </div>
  );
}
