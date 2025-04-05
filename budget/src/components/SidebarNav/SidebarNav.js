import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faWallet,
  faDollarSign,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./SidebarNav.css";

function Navbar() {
  return (
    <Nav className="nav-horizontal fixed-top">
      <Link to="/dashboard" className="nav-brand">
        <img
          src={`${process.env.PUBLIC_URL}/images/Logo/logo-3.png`}
          alt="Logo"
          className="logo-img"
        />
      </Link>
      <div className="nav-links">
        <Nav.Link as={Link} to="/dashboard" className="nav-item">
          <FontAwesomeIcon icon={faHome} className="nav-icon" /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/incomes" className="nav-item">
          <FontAwesomeIcon icon={faDollarSign} className="nav-icon" /> Incomes
        </Nav.Link>
        <Nav.Link as={Link} to="/expenses" className="nav-item">
          <FontAwesomeIcon icon={faWallet} className="nav-icon" /> Expenses
        </Nav.Link>
      </div>
      <div className="nav-exit">
        <Nav.Link as={Link} to="/signout" className="exit-link">
          <FontAwesomeIcon icon={faRightFromBracket} className="nav-icon" />
        </Nav.Link>
      </div>
    </Nav>
  );
}

export default Navbar;
