import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth } from '../components/login/AuthContext';

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { isLoggedIn, logout, roleName, employeeID } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = () => {
    setExpanded(false);
  };

  const handleLogoutClick = () => {
    setExpanded(false);
    logout();
    navigate('/login');
  };
  
  return (
    <Navbar expand="lg" expanded={expanded} style={{ borderBottom: "1px solid #ccc", backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)' }}>
      <Navbar.Brand as={NavLink} to="/" className="p-2">
        <h3 style={{ fontFamily: 'Times New Roman", Times, serif' }}> THAY TECHNOLOGIES</h3>
        <h5 style={{ fontFamily: 'Times New Roman", Times, serif' }}> Private Limited</h5>
      </Navbar.Brand>
      <Navbar.Toggle className="me-3" aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>

        {isLoggedIn && (roleName === 'admin' || roleName === 'superuser') && (
            <>
              <Nav.Link as={NavLink} to="/AttendanceSheet" className="p-3" onClick={handleNavClick}>
                Attendance Sheet
              </Nav.Link>
              <Nav.Link as={NavLink} to="/DisplayEmployees" className="p-3" onClick={handleNavClick}>
                Employees List
              </Nav.Link>
              <Nav.Link as={NavLink} to="/PaySlip" className="p-3" onClick={handleNavClick}>
                PaySlip
              </Nav.Link>
              <Nav.Link as={NavLink} to="/ReadRole" className="p-3" onClick={handleNavClick}>
                Role Details
              </Nav.Link>
              <Nav.Link as={NavLink} to="/DisplayHolidays" className="p-3" onClick={handleNavClick}>
                Holiday list
              </Nav.Link>
              <Nav.Link as={NavLink} to="/DisplayTime" className="p-3" onClick={handleNavClick}>
                Attendance
              </Nav.Link>
            </>
          )}
        {isLoggedIn && ( roleName === 'employee') && (
            <>
              <Nav.Link as={NavLink} to="/AttendanceSheet" className="p-3" onClick={handleNavClick}>
                Attendance Sheet
              </Nav.Link>
              <Nav.Link as={NavLink} to={`/ReadEmployee/${employeeID}`} className="p-3" onClick={handleNavClick}>
              Employee Details
            </Nav.Link>
              <Nav.Link as={NavLink} to="/DisplayHolidays" className="p-3" onClick={handleNavClick}>
                Holiday list
              </Nav.Link>
            </>
          )}
          <Nav.Link as={NavLink} to="/AboutUs" className="p-3" onClick={handleNavClick}>
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/ContactUs" className="p-3" onClick={handleNavClick}>
            Contact
          </Nav.Link>
          {isLoggedIn && (
            <>
              <Nav.Link onClick={handleLogoutClick} className="p-3">
                Logout
              </Nav.Link>
            </>
          )}
          {!isLoggedIn && (
            <Nav.Link as={NavLink} to="/login" className="p-3">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
