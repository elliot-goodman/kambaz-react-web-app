/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, FormControl } from "react-bootstrap";
import * as client from "./client";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            defaultValue={profile.username}
            id="wd-username"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            defaultValue={profile.password}
            id="wd-password"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            defaultValue={profile.firstName}
            id="wd-firstname"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            defaultValue={profile.lastName}
            id="wd-lastname"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            defaultValue={profile.dob}
            id="wd-dob"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
          />
          <FormControl
            defaultValue={profile.email}
            id="wd-email"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control mb-2"
            id="wd-role"
          >
            <option value="USER">User</option>{" "}
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
          >
            {" "}
            Update{" "}
          </button>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}

// import { Form, FormControl } from "react-bootstrap";
// import { Link } from "react-router-dom";
// export default function Profile() {
//   return (
//     <div id="wd-signin-screen">
//       <h1>Profile</h1>
//       <Form.Control
//         id="wd-username"
//         placeholder="username"
//         value="alice"
//         className="mb-2"
//       />
//       <Form.Control
//         id="wd-password"
//         placeholder="password"
//         value="123"
//         className="mb-2"
//       />
//       <Form.Control
//         id="wd-first-name"
//         placeholder="First Name"
//         value="Alice"
//         className="mb-2"
//       />
//       <Form.Control
//         id="wd-last-name"
//         placeholder="Last Name"
//         value="Wonderland"
//         className="mb-2"
//       />
//       <FormControl type="date" id="wd-birthday"></FormControl>
//       <Form.Control
//         type="email"
//         id="wd-email"
//         placeholder="Email"
//         value="alice@wonderland.com"
//         className="mb-2 wd-margin-top-tiny"
//       />
//       <Form.Select id="wd-box-dropdown">
//         <option>User</option>
//         <option value="1">USER</option>
//         <option value="2">FACULTY</option>
//         <option value="3">STUDENT</option>
//       </Form.Select>
//       <Link
//         id="wd-signout-btn"
//         to="/Kambaz/Account/Signin"
//         className="btn btn-primary w-100 mb-2 wd-margin-top-tiny"
//       >
//         Sign out{" "}
//       </Link>
//     </div>
//   );
// }
