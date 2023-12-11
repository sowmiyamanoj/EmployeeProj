import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkStyles = {
    textDecoration: "none",
    padding: "10px",
    color: "#333",
    transition: "color 0.3s ease-in-out",
  };

  const activeStyles = {
    fontWeight: "bold",
    color: "#007bff",
  };

  const navLink = ({ isActive }) => {
    return isActive ? activeStyles : {};
  };
  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "lightblue",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: "0" }}>
        <NavLink
          className="p-3"
          style={{ ...navLinkStyles, ...navLink }}
          to="/"
        >
          Thay Technology
        </NavLink>
      </h2>

      <div className="NavLinks" style={{ display: "flex" }}>
        <NavLink
          className="p-3"
          style={{ ...navLinkStyles, ...navLink }}
          to="/DisplayEmployees"
        >
          Employees List
        </NavLink>
        <NavLink
          className="p-3"
          style={{ ...navLinkStyles, ...navLink }}
          to="/ReadRole"
        >
          Role Details
        </NavLink>
        <NavLink
          className="p-3"
          style={{ ...navLinkStyles, ...navLink }}
          to="/DisplayHolidays"
        >
          Holiday list
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
