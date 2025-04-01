/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditProtection from "./Courses/EditProtection";
import { useEffect, useState } from "react";
import {
  addEnrollment,
  deleteEnrollment,
  setEnrollments,
} from "./Enrollments/reducer";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Dashboard({
  allCourses,
  courses,
  course,
  setAllCourses,
  setCourse,
  setCourses,
}: {
  allCourses: any[];
  courses: any[];
  course: any;
  setAllCourses: (courses: any[]) => void;
  setCourse: (course: any) => void;
  setCourses: (courses: any[]) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const fetchEnrollments = async () => {
    const enrollments = await courseClient.findEnrollmentsForCourse(
      course._id as string
    );
    dispatch(setEnrollments(enrollments));
  };
  useEffect(() => {
    fetchEnrollments();
  }, []);

  const createEnrollmentForCourse = async () => {
    const newEnrollment = { user: currentUser._id, course: course._id };
    const enrollment = await courseClient.createEnrollmentForCourse(
      course._id,
      newEnrollment
    );
    dispatch(addEnrollment(enrollment));
  };

  const [isEnrollments, setIsEnrollments] = useState(false);
  const [displayCourses, setDisplayCourses] = useState(courses);

  const handleEnrollmentsButton = () => {
    if (isEnrollments) {
      setDisplayCourses(courses);
    } else {
      setDisplayCourses(allCourses);
    }
  };

  const handleEnroll = () => {
    createEnrollmentForCourse();
  };

  const handleUnenroll = (course: any) => {
    dispatch(
      deleteEnrollment(
        enrollments.find(
          (enrollment: any) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        )._id
      )
    );
  };

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
    setAllCourses([...allCourses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    setAllCourses(allCourses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
    setAllCourses(
      allCourses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    <div id="wd-dashboard">
      {currentUser.role === "STUDENT" ? (
        <Button
          onClick={() => {
            setIsEnrollments(!isEnrollments);
            handleEnrollmentsButton();
          }}
          variant="primary"
          className="btn float-end"
          id="wd-delete-course-click"
        >
          Enrollments
        </Button>
      ) : undefined}
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <EditProtection>
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            // onClick={() => dispatch(addCourse(course))}
            onClick={addNewCourse}
          >
            {" "}
            Add{" "}
          </button>
          <button
            className="btn btn-warning float-end me-2"
            // onClick={() => dispatch(updateCourse(course))}
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>

        <br />
        <FormControl
          value={course.name}
          className="mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <Form.Control
          as="textarea"
          value={course.description}
          rows={3}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
        <hr />
      </EditProtection>
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayCourses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <>
                  {enrollments.some(
                    (enrollment: any) =>
                      enrollment.user === currentUser._id &&
                      enrollment.course === course._id
                  ) ? (
                    <Link
                      to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <Card.Img
                        src={`/images/${course.image}`}
                        variant="top"
                        width="100%"
                        height={160}
                      />
                      <Card.Body className="card-body">
                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {course.name}{" "}
                        </Card.Title>
                        <Card.Text
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}
                        >
                          {course.description}{" "}
                        </Card.Text>
                        <Button variant="primary"> Go </Button>
                        <EditProtection>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              // dispatch(deleteCourse(course._id));
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </EditProtection>
                        {isEnrollments ? (
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleUnenroll(course);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Unenroll
                          </Button>
                        ) : undefined}
                      </Card.Body>
                    </Link>
                  ) : (
                    <div className="wd-dashboard-course-link text-decoration-none text-dark">
                      <Card.Img
                        src={`/images/${course.image}`}
                        variant="top"
                        width="100%"
                        height={160}
                      />
                      <Card.Body className="card-body">
                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {course.name}{" "}
                        </Card.Title>
                        <Card.Text
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}
                        >
                          {course.description}{" "}
                        </Card.Text>
                        <Button variant="primary" disabled>
                          {" "}
                          Go{" "}
                        </Button>{" "}
                        <EditProtection>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              // dispatch(deleteCourse(course._id));
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </EditProtection>
                        {isEnrollments ? (
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleEnroll();
                            }}
                            variant="success"
                            className="btn float-end"
                            id="wd-delete-course-click"
                          >
                            Enroll
                          </Button>
                        ) : undefined}
                      </Card.Body>
                    </div>
                  )}
                </>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import EditProtection from "./Courses/EditProtection";
// import { useEffect, useState } from "react";
// import {
//   addEnrollment,
//   deleteEnrollment,
//   setEnrollments,
// } from "./Enrollments/reducer";
// import * as userClient from "./Account/client";
// import * as courseClient from "./Courses/client";

// export default function Dashboard({
//   allCourses,
//   courses,
//   course,
//   setCourse,
//   setCourses,
// }: {
//   allCourses: any[];
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   setCourses: (courses: any[]) => void;
// }) {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
//   const dispatch = useDispatch();
//   const fetchEnrollments = async () => {
//     const enrollments = await courseClient.findEnrollmentsForCourse(
//       course._id as string
//     );
//     dispatch(setEnrollments(enrollments));
//   };
//   useEffect(() => {
//     fetchEnrollments();
//   }, []);

//   const createEnrollmentForCourse = async () => {
//     const newEnrollment = { user: currentUser._id, course: course._id };
//     const enrollment = await courseClient.createEnrollmentForCourse(
//       course._id,
//       newEnrollment
//     );
//     dispatch(addEnrollment(enrollment));
//   };

//   const [isEnrollments, setIsEnrollments] = useState(false);
//   const [displayCourses, setDisplayCourses] = useState(courses);

//   const handleEnrollmentsButton = () => {
//     if (isEnrollments) {
//       setDisplayCourses(courses);
//     } else {
//       setDisplayCourses(allCourses);
//     }
//   };

//   const handleEnroll = () => {
//     createEnrollmentForCourse();
//   };

//   const handleUnenroll = (course: any) => {
//     dispatch(
//       deleteEnrollment(
//         enrollments.find(
//           (enrollment: any) =>
//             enrollment.user === currentUser._id &&
//             enrollment.course === course._id
//         )._id
//       )
//     );
//   };

//   const addNewCourse = async () => {
//     const newCourse = await userClient.createCourse(course);
//     setCourses([...courses, newCourse]);
//   };

//   const deleteCourse = async (courseId: string) => {
//     await courseClient.deleteCourse(courseId);
//     setCourses(courses.filter((course) => course._id !== courseId));
//   };

//   const updateCourse = async () => {
//     await courseClient.updateCourse(course);
//     setCourses(
//       courses.map((c) => {
//         if (c._id === course._id) {
//           return course;
//         } else {
//           return c;
//         }
//       })
//     );
//   };

//   return (
//     <div id="wd-dashboard">
//       {currentUser.role === "STUDENT" ? (
//         <Button
//           onClick={() => {
//             setIsEnrollments(!isEnrollments);
//             handleEnrollmentsButton();
//           }}
//           variant="primary"
//           className="btn float-end"
//           id="wd-delete-course-click"
//         >
//           Enrollments
//         </Button>
//       ) : undefined}
//       <h1 id="wd-dashboard-title">Dashboard</h1>
//       <hr />
//       <EditProtection>
//         <h5>
//           New Course
//           <button
//             className="btn btn-primary float-end"
//             id="wd-add-new-course-click"
//             // onClick={() => dispatch(addCourse(course))}
//             onClick={addNewCourse}
//           >
//             {" "}
//             Add{" "}
//           </button>
//           <button
//             className="btn btn-warning float-end me-2"
//             // onClick={() => dispatch(updateCourse(course))}
//             onClick={updateCourse}
//             id="wd-update-course-click"
//           >
//             Update
//           </button>
//         </h5>

//         <br />
//         <FormControl
//           value={course.name}
//           className="mb-2"
//           onChange={(e) => setCourse({ ...course, name: e.target.value })}
//         />
//         <Form.Control
//           as="textarea"
//           value={course.description}
//           rows={3}
//           onChange={(e) =>
//             setCourse({ ...course, description: e.target.value })
//           }
//         />
//         <hr />
//       </EditProtection>
//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>{" "}
//       <hr />
//       <div id="wd-dashboard-courses">
//         <Row xs={1} md={5} className="g-4">
//           {displayCourses.map((course) => (
//             <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//               <Card>
//                 <>
//                   {enrollments.some(
//                     (enrollment: any) =>
//                       enrollment.user === currentUser._id &&
//                       enrollment.course === course._id
//                   ) ? (
//                     <Link
//                       to={`/Kambaz/Courses/${course._id}/Home`}
//                       className="wd-dashboard-course-link text-decoration-none text-dark"
//                     >
//                       <Card.Img
//                         src={`/images/${course.image}`}
//                         variant="top"
//                         width="100%"
//                         height={160}
//                       />
//                       <Card.Body className="card-body">
//                         <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                           {course.name}{" "}
//                         </Card.Title>
//                         <Card.Text
//                           className="wd-dashboard-course-description overflow-hidden"
//                           style={{ height: "100px" }}
//                         >
//                           {course.description}{" "}
//                         </Card.Text>
//                         <Button variant="primary"> Go </Button>
//                         <EditProtection>
//                           <button
//                             onClick={(event) => {
//                               event.preventDefault();
//                               event.stopPropagation();
//                               // dispatch(deleteCourse(course._id));
//                               deleteCourse(course._id);
//                             }}
//                             className="btn btn-danger float-end"
//                             id="wd-delete-course-click"
//                           >
//                             Delete
//                           </button>
//                           <button
//                             id="wd-edit-course-click"
//                             onClick={(event) => {
//                               event.preventDefault();
//                               event.stopPropagation();
//                               setCourse(course);
//                             }}
//                             className="btn btn-warning me-2 float-end"
//                           >
//                             Edit
//                           </button>
//                         </EditProtection>
//                         {isEnrollments ? (
//                           <Button
//                             onClick={(event) => {
//                               event.preventDefault();
//                               event.stopPropagation();
//                               handleUnenroll(course);
//                             }}
//                             className="btn btn-danger float-end"
//                             id="wd-delete-course-click"
//                           >
//                             Unenroll
//                           </Button>
//                         ) : undefined}
//                       </Card.Body>
//                     </Link>
//                   ) : (
//                     <div className="wd-dashboard-course-link text-decoration-none text-dark">
//                       <Card.Img
//                         src={`/images/${course.image}`}
//                         variant="top"
//                         width="100%"
//                         height={160}
//                       />
//                       <Card.Body className="card-body">
//                         <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                           {course.name}{" "}
//                         </Card.Title>
//                         <Card.Text
//                           className="wd-dashboard-course-description overflow-hidden"
//                           style={{ height: "100px" }}
//                         >
//                           {course.description}{" "}
//                         </Card.Text>
//                         <Button variant="primary" disabled>
//                           {" "}
//                           Go{" "}
//                         </Button>{" "}
//                         <EditProtection>
//                           <button
//                             onClick={(event) => {
//                               event.preventDefault();
//                               event.stopPropagation();
//                               // dispatch(deleteCourse(course._id));
//                               deleteCourse(course._id);
//                             }}
//                             className="btn btn-danger float-end"
//                             id="wd-delete-course-click"
//                           >
//                             Delete
//                           </button>
//                           <button
//                             id="wd-edit-course-click"
//                             onClick={(event) => {
//                               event.preventDefault();
//                               event.stopPropagation();
//                               setCourse(course);
//                             }}
//                             className="btn btn-warning me-2 float-end"
//                           >
//                             Edit
//                           </button>
//                         </EditProtection>
//                         {isEnrollments ? (
//                           <Button
//                             onClick={(event) => {
//                               event.preventDefault();
//                               event.stopPropagation();
//                               handleEnroll();
//                             }}
//                             variant="success"
//                             className="btn float-end"
//                             id="wd-delete-course-click"
//                           >
//                             Enroll
//                           </Button>
//                         ) : undefined}
//                       </Card.Body>
//                     </div>
//                   )}
//                 </>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// }
