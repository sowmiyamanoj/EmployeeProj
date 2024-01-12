import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const CustomNavbar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isLoginPage = location.pathname === "/sign-in";
  const isSignUpPage = location.pathname === "/sign-up";

  if (isLoginPage || isSignUpPage) {
    return null;
  }

  const handleNavClick = () => {
    setExpanded(false); // Close the navbar menu when a link is clicked
  };

  return (
    <Navbar expand="lg" expanded={expanded} style={{ borderBottom: "1px solid #ccc",  backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)'}} >
      <Navbar.Brand as={NavLink} to="/" className="p-2">
        <h3 style={{ fontFamily: 'Times New Roman", Times, serif' }}> THAY TECHNOLOGIES</h3>
        <h5 style={{ fontFamily: 'Times New Roman", Times, serif' }}> Private Limited</h5>

      </Navbar.Brand>
      <Navbar.Toggle className="me-3" aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
        <Nav.Link as={NavLink} to="/AttendanceSheet" className="p-3" onClick={handleNavClick} style={{  fontFamily: 'Times New Roman", Times, serif'}}>
             Attendance Sheet
          </Nav.Link>
          <Nav.Link as={NavLink} to="/DisplayEmployees" className="p-3" onClick={handleNavClick} style={{  fontFamily: 'Times New Roman", Times, serif'}}>
            Employees List
          </Nav.Link>
          <Nav.Link as={NavLink} to="/ReadRole" className="p-3" onClick={handleNavClick} style={{  fontFamily: 'Times New Roman", Times, serif'}}>
            Role Details
          </Nav.Link>
          <Nav.Link as={NavLink} to="/DisplayHolidays" className="p-3" onClick={handleNavClick} style={{  fontFamily: 'Times New Roman", Times, serif'}}>
            Holiday list
          </Nav.Link>
          <Nav.Link as={NavLink} to="/AboutUs" className="p-3" onClick={handleNavClick} style={{  fontFamily: 'Times New Roman", Times, serif'}}>
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/ContactUs" className="p-3" onClick={handleNavClick} style={{  fontFamily: 'Times New Roman", Times, serif'}}>
            Contact
          </Nav.Link>
          <Nav.Link as={NavLink} to="/DisplayTime" className="p-3" onClick={handleNavClick} style={{  fontFamily: 'Times New Roman", Times, serif'}}>
            Attendence 
          </Nav.Link>
          <Nav.Link as={NavLink} to="/PaySlip" className="p-3" onClick={handleNavClick} style={{  fontFamily: 'Times New Roman", Times, serif'}}>
            PaySlip
          </Nav.Link>
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default CustomNavbar;