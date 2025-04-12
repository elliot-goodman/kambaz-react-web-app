/* eslint-disable @typescript-eslint/no-explicit-any */
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  return (
    <Nav id="wd-account-navigation" className="flex-column">
      {links.map((link: string) => (
        <Nav.Link
          as={Link}
          to={`/Kambaz/Account/${link}`}
          className={`text-${
            pathname.includes(link) ? "black" : "danger"
          } text-decoration-none fs-4 mb-2`}
        >
          {link}
        </Nav.Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Nav.Link
          as={Link}
          to={`/Kambaz/Account/Users`}
          className={`text-black text-decoration-none fs-4 mb-2 ${active("Users")}`}
        >
          {" "}
          Users{" "}
        </Nav.Link>
      )}
    </Nav>
  );
}
