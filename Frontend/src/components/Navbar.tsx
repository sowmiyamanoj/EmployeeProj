import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth } from '../components/login/AuthContext';
import axios from "axios";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [employee, setEmployee] = useState<any>({});

  const { isLoggedIn, logout, roleName, token, employeeID } = useAuth();
  const navigate = useNavigate();

  const employeecall = () => {
    const baseUrl = (`https://thaydb.vercel.app`);
    axios
      .get(`${baseUrl}/api/employee/${employeeID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const employeeData = response.data[0];
        setEmployee(employeeData);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  };

  useEffect(() => {
    employeecall();
  }, [token, employeeID]);

  const handleNavClick = () => {
    setExpanded(false);
  };

  const handleLogoutClick = () => {
    setExpanded(false);
    logout();
    navigate('/login');
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="employee-name-tooltip" {...props}>
      {employee.employeeName} <br />
      {employee.email}
    </Tooltip>
  );

  return (
    <>
      <Navbar expand="lg" expanded={expanded} style={{justifyContent:'flex-end',borderBottom: "1px solid #ccc", backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)' }}>

        
        <Navbar.Brand as={NavLink} onClick={handleNavClick} to="/" style={{position:'sticky', right:520}} className="p-2 ml-auto" >
          <h3 style={{ fontFamily: 'Times New Roman", Times, serif' }}> THAY TECHNOLOGIES</h3>
          <h5 style={{ fontFamily: 'Times New Roman", Times, serif' }}> Private Limited</h5>
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="m-3" onClick={() => setExpanded(!expanded)} />

        {/* Collapsible Content */}
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
            {isLoggedIn && (roleName === 'employee') && (
              <>
                <Nav.Link as={NavLink} to="/AttendanceSheet" className="p-3" onClick={handleNavClick}>
                  Attendance Sheet
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
                <Nav.Link onClick={handleLogoutClick} className="p-3"   >
                  Logout
                </Nav.Link>
              </>
            )}
            {!isLoggedIn && (
              <><Nav.Link as={NavLink} onClick={handleNavClick} to="/login" className="p-3">
                Login

              </Nav.Link></>
            )}
          </Nav>
        </Navbar.Collapse>

        {/* Profile Icon */}
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Navbar.Brand className='ms-2 me-3 justify-content-end' as={NavLink} onClick={handleNavClick} to={`/ReadEmployee/${employeeID}`}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
    {isLoggedIn && (
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#1b5954',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        {employee.employeeName && employee.employeeName.charAt(0)}
      </div>
    )}
  </div>
</Navbar.Brand>
        </OverlayTrigger>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
