import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SidebarNav from "../SidebarNav/SidebarNav";
import BreadcrumbAndProfile from "../BreadcrumbAndProfile/BreadcrumbAndProfile";
import InfoCard from "../InfoCard/InfoCard";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Dashboard({ totalIncomes, totalExpenses }) {
  // Calculate the total financial data
  const total = totalIncomes - totalExpenses;
  // Function to reload the page
  const handleReload = () => {
    window.location.reload();
  };
  
  return (
    <Container fluid>
      <Row className="mt-5">
        <Col md={0.5} className="sidebar">
          <SidebarNav />
        </Col>
        <Col md={11} className="main-content main">
          {/* Top Row: Dashboard title + Reload Button */}
          <Row className="align-items-center justify-content-between mb-2">
            <Col>
              <h2 className="dashboard-title">Dashboard</h2>
            </Col>
            <Col className="text-end">
              <Button onClick={handleReload} className="secondary-button">
                <FontAwesomeIcon icon={faRotateRight} className="icon-left" />
              </Button>
            </Col>
          </Row>
          {/* Profile Section */}
          <BreadcrumbAndProfile
            username="Mr"
            role="Admin"
            pageTitle="Dashboard"
            breadcrumbItems={[
              { name: "Dashboard", path: "/dashboard", active: true },
              { name: "Welcome", path: "/welcome", active: true },
            ]}
          />
          {/* Row for the Total, Incomes, and Expenses */}
          <Row className="mb-2 mt-3">
            <Col md={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <InfoCard
                  title="Total"
                  value={`$${total}`}
                  linkText="View details"
                  linkTo="/dashboard"
                />
              </motion.div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <InfoCard
                  title="Incomes"
                  value={`$${totalIncomes}`}
                  linkText="Add or manage your Income"
                  linkTo="/incomes"
                />
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <InfoCard
                  title="Expenses"
                  value={`$${totalExpenses}`}
                  linkText="Add or manage your expenses"
                  linkTo="/expenses"
                />
              </motion.div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
