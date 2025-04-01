/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";

import { useSelector } from "react-redux";

export default function Kambaz() {
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    try {
      if (currentUser) {
        const courses = await courseClient.fetchAllCourses();
        setCourses(courses);
        const userCourses = await userClient.findMyCourses();
        setUserCourses(userCourses);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setUserCourses([...userCourses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setUserCourses(userCourses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setUserCourses(
      userCourses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    userCourses={userCourses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={userCourses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Routes, Route, Navigate } from "react-router";
// import Account from "./Account";
// import Dashboard from "./Dashboard";
// import KambazNavigation from "./Navigation";
// import Courses from "./Courses";
// import "./styles.css";
// import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import ProtectedRoute from "./Account/ProtectedRoute";
// import { useSelector } from "react-redux";
// import Session from "./Account/Session";
// import * as userClient from "./Account/client";
// import * as coursesClient from "./Courses/client";

// export default function Kambaz() {
//   const [allCourses, setAllCourses] = useState<any[]>([]);
//   const [courses, setCourses] = useState<any[]>([]);
//   const [course, setCourse] = useState<any>({
//     _id: uuidv4(),
//     name: "New Course",
//     number: "New Number",
//     startDate: "2023-09-10",
//     endDate: "2023-12-15",
//     description: "New Description",
//   });
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const fetchCourses = async () => {
//     try {
//       const courses = await userClient.findMyCourses();
//       setCourses(courses);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     fetchCourses();
//   }, [currentUser]);

//   const fetchAllCourses = async () => {
//     try {
//       const courses = await coursesClient.fetchAllCourses();
//       setAllCourses(courses);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   return (
//     <Session>
//       <div id="wd-kambaz">
//         <KambazNavigation />
//         <div className="wd-main-content-offset p-3">
//           <Routes>
//             <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
//             <Route path="/Account/*" element={<Account />} />
//             <Route
//               path="/Dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard
//                     allCourses={allCourses}
//                     courses={courses}
//                     course={course}
//                     setAllCourses={setAllCourses}
//                     setCourse={setCourse}
//                     setCourses={setCourses}
//                   />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/Courses/:cid/*"
//               element={
//                 <ProtectedRoute>
//                   <Courses courses={courses} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/Calendar" element={<h1>Calendar</h1>} />
//             <Route path="/Inbox" element={<h1>Inbox</h1>} />
//           </Routes>
//         </div>
//       </div>
//     </Session>
//   );
// }
