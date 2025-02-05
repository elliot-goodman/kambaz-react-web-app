import { Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Profile() {
  // return (
  //   <div id="wd-profile-screen">
  //     <h3>Profile</h3>
  //     <input
  //       defaultValue="alice"
  //       placeholder="username"
  //       className="wd-username"
  //     />
  //     <br />
  //     <input
  //       defaultValue="123"
  //       placeholder="password"
  //       type="password"
  //       className="wd-password"
  //     />
  //     <br />
  //     <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" />
  //     <br />
  //     <input
  //       defaultValue="Wonderland"
  //       placeholder="Last Name"
  //       id="wd-lastname"
  //     />
  //     <br />
  //     <input defaultValue="2000-01-01" type="date" id="wd-dob" />
  //     <br />
  //     <input defaultValue="alice@wonderland" type="email" id="wd-email" />
  //     <br />
  //     <select defaultValue="FACULTY" id="wd-role">
  //       <option value="USER">User</option> <option value="ADMIN">Admin</option>
  //       <option value="FACULTY">Faculty</option>{" "}
  //       <option value="STUDENT">Student</option>
  //     </select>
  //     <br />
  //     <Link to="/Kambaz/Account/Signin">Sign out</Link>
  //   </div>
  // );

  return (
    <div id="wd-signin-screen">
      <h1>Profile</h1>
      <Form.Control
        id="wd-username"
        placeholder="username"
        value="alice"
        className="mb-2"
      />
      <Form.Control
        id="wd-password"
        placeholder="password"
        value="123"
        className="mb-2"
      />
      <Form.Control
        id="wd-first-name"
        placeholder="First Name"
        value="Alice"
        className="mb-2"
      />
      <Form.Control
        id="wd-last-name"
        placeholder="Last Name"
        value="Wonderland"
        className="mb-2"
      />
      <FormControl type="date" id="wd-birthday"></FormControl>
      <Form.Control
        type="email"
        id="wd-email"
        placeholder="Email"
        value="alice@wonderland.com"
        className="mb-2 wd-margin-top-tiny"
      />
      <Form.Select id="wd-box-dropdown">
        <option>User</option>
        <option value="1">USER</option>
        <option value="2">FACULTY</option>
        <option value="3">STUDENT</option>
      </Form.Select>
      <Link
        id="wd-signout-btn"
        to="/Kambaz/Account/Signin"
        className="btn btn-primary w-100 mb-2 wd-margin-top-tiny"
      >
        Sign out{" "}
      </Link>
    </div>
  );
}
