import Signin from "./Signin";
import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { Col, Container, Row } from "react-bootstrap";

export default function Account() {
  return (
    <Container id="wd-account-screen" fluid>
      <Row>
        <Col md={1} className="wd-margin-right-small">
          <AccountNavigation />
        </Col>
        <Col md={3}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/Kambaz/Account/Signin" />}
            />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}
