import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
export default function KambazNavigation() {
  const location = useLocation();

  return (
    <Nav
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="flex-column position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <Nav.Link
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="/images/neu.png" width={90} />
      </Nav.Link>
      <Nav.Link
        href="#/Kambaz/Account"
        id="wd-account-link"
        className={`list-group-item text-center border-0 bg-black ${location.pathname === "/Kambaz/Account/Signin" ? "bg-white text-danger" : "text-white"}`}
      >
        <FaRegCircleUser className="fs-1 text text-white" />
        <br />
        Account
      </Nav.Link>
      <Nav.Link
        href="#/Kambaz/Dashboard"
        id="wd-dashboard-link"
        className={`list-group-item text-center border-0 bg-black ${location.pathname === "/Kambaz/Dashboard" ? "bg-white text-danger" : "text-white"}`}
      >
        <AiOutlineDashboard className="fs-1 text wd-icon-red" />
        <br />
        Dashboard
      </Nav.Link>
      <Nav.Link
        href="#/Kambaz/Dashboard"
        id="wd-course-link"
        className="list-group-item text-center border-0 bg-black text-white"
      >
        <LiaBookSolid className="fs-1 text wd-icon-red" />
        <br />
        Courses
      </Nav.Link>
      <Nav.Link
        href="#/Kambaz/Calendar"
        id="wd-calendar-link"
        className={`list-group-item text-center border-0 bg-black ${location.pathname === "/Kambaz/Calendar" ? "bg-white text-danger" : "text-white"}`}
      >
        <IoCalendarOutline className="fs-1 text wd-icon-red" />
        <br />
        Calendar
      </Nav.Link>
      <Nav.Link
        href="#/Kambaz/Inbox"
        id="wd-inbox-link"
        className={`list-group-item text-center border-0 bg-black ${location.pathname === "/Kambaz/Inbox" ? "bg-white text-danger" : "text-white"}`}
      >
        <FaInbox className="fs-1 text wd-icon-red" />
        <br />
        Inbox
      </Nav.Link>
      <Nav.Link
        href="#/Labs"
        id="wd-labs-link"
        className="list-group-item text-center border-0 bg-black text-white"
      >
        <LiaCogSolid className="fs-1 text wd-icon-red" />
        <br />
        Labs
      </Nav.Link>
    </Nav>
  );
}
