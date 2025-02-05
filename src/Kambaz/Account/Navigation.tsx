import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <Nav id="wd-account-navigation" className="flex-column">
      <Nav.Link
        as={Link}
        to="/Kambaz/Account/Signin"
        className="text-black wd-border-left-black text-decoration-none fs-4 mb-2"
      >
        Signin
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/Kambaz/Account/Signup"
        className="text-danger text-decoration-none fs-4 mb-2"
      >
        Signup
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/Kambaz/Account/Profile"
        className="text-danger text-decoration-none fs-4 mb-2"
      >
        Profile
      </Nav.Link>
    </Nav>
  );
}
