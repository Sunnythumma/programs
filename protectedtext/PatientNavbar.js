import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setLogout } from "../../store/actions/userAction";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLogout());
    localStorage.removeItem("token");
  }, [dispatch]);

  return <Navigate to="/login" />;
};

export default Logout;

// import React from "react";
// import { Navigate } from "react-router-dom";

// const Logout = () => {
//   localStorage.removeItem("token");

//   return <Navigate to="/login" />;
// };

// export default Logout;


export default function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}


import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import parseJwt from "../ParseJWT";

const PatientNavbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      margin: "6px",
      fontWeight: isActive ? "italic" : "normal",
      textDecoration: isActive ? "none" : "none",
      color: isActive ? "black" : "grey",
      fontSize: "20px",
    };
  };

  const { isLogin } = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="warning" variant="light">
        <Navbar.Brand>
          <NavLink to="/" style={navLinkStyles}>
            <i className="handouts-title">Handouts</i>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          data-bs-target="#navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll" className="justify-content-around">
          {/* <Nav>
            <NavLink to="/" style={navLinkStyles}>
              <i className="handouts-title">Handouts</i>
            </NavLink>
          </Nav> */}
          <Nav>
            <NavLink to="/" style={navLinkStyles}>
              Home
            </NavLink>
            <NavLink to="/aboutus" style={navLinkStyles}>
              About
            </NavLink>
            {isLogin && parseJwt(token).user.role === "PATIENT" && (
              <>
                <NavLink to="/patientrequest" style={navLinkStyles}>
                  Send Request
                </NavLink>
                <NavLink to="/myrequest" style={navLinkStyles}>
                  My Request
                </NavLink>
              </>
            )}
            {isLogin && parseJwt(token).user.role === "DONER" && (
              <>
                <NavLink style={navLinkStyles} to="/allrequest">
                  All Request
                </NavLink>
                <NavLink style={navLinkStyles} to="/mydonation">
                  My Donation
                </NavLink>
                <NavLink style={navLinkStyles} to="/myhistory">
                  My History
                </NavLink>
              </>
            )}
            {isLogin &&
              (parseJwt(token).user.role === "PATIENT" ||
                parseJwt(token).user.role === "DONER") && (
                <NavLink to="/patientprofile" style={navLinkStyles}>
                  Profile
                </NavLink>
              )}
            {isLogin ? (
              <NavLink style={navLinkStyles} to="/logout">
                Logout
              </NavLink>
            ) : (
              <NavLink style={navLinkStyles} to="/login">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default PatientNavbar;
