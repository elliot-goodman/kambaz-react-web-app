/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditProtection from "./Courses/EditProtection";
import {
  addEnrollment,
  deleteEnrollment,
  setEnrollments,
} from "./Enrollments/reducer";
import { useState, useEffect } from "react";
import * as enrollmentsClient from "./Enrollments/client";
import { Card } from "react-bootstrap";

export default function Dashboard({
  courses,
  userCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  userCourses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const dispatch = useDispatch();

  async function enrollInCourse(course: string) {
    const enrollment = {
      user: currentUser?._id,
      course: course,
    };
    const newEnrollment =
      await enrollmentsClient.enrollUserInCourse(enrollment);
    dispatch(addEnrollment(newEnrollment));
    fetchEnrollments();
  }

  async function unenrollFromCourse(course: string) {
    const enrollment = enrollments.find(
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === course
    );
    await enrollmentsClient.deleteEnrollment(enrollment._id);
    dispatch(deleteEnrollment(enrollment._id));
  }

  function isEnrolledInCourse(course: string) {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === course
    );
  }

  const fetchEnrollments = async () => {
    const enrollments = await enrollmentsClient.getEnrollmentsForUser(
      currentUser?._id
    );
    console.log("enrollements", enrollments);
    dispatch(setEnrollments(enrollments));
  };

  useEffect(() => {
    fetchEnrollments();
  }, [userCourses]);

  return (
    <div id="wd-dashboard" className="ms-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title" className="m-0">
          Dashboard
        </h1>
        <EditProtection role="STUDENT">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowAllCourses(!showAllCourses);
            }}
          >
            Enrollments
          </button>
        </EditProtection>
      </div>
      <hr />
      <EditProtection role="FACULTY">
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            {" "}
            Add{" "}
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <br />
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
        <hr />
      </EditProtection>
      <h2 id="wd-dashboard-published">
        Published Courses ({enrollments.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4 mb-4">
          {courses
            .filter((course) =>
              showAllCourses ? true : isEnrolledInCourse(course._id)
            )
            .map((course) => {
              return (
                <div
                  className="wd-dashboard-course col"
                  style={{ width: "300px" }}
                  key={course._id}
                >
                  <div className="card rounded-3 overflow-hidden">
                    <Link
                      to={
                        isEnrolledInCourse(course._id)
                          ? `/Kambaz/Courses/${course._id}/Home`
                          : "/Kambaz/Dashboard"
                      }
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <Card.Img
                        src={`/images/${course.image}`}
                        variant="top"
                        width="100%"
                        height={160}
                      />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                          {course.name}{" "}
                        </h5>
                        <p
                          className="wd-dashboard-course-title card-text overflow-y-hidden"
                          style={{ maxHeight: 100 }}
                        >
                          {course.description}{" "}
                        </p>
                        <button className="btn btn-primary"> Go </button>

                        <EditProtection role="FACULTY">
                          <button
                            onClick={(event) => {
                              event.preventDefault();
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
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </EditProtection>
                        <EditProtection role="STUDENT">
                          {isEnrolledInCourse(course._id) ? (
                            showAllCourses ? (
                              <button
                                onClick={(event) => {
                                  event.preventDefault();
                                  unenrollFromCourse(course._id);
                                }}
                                className="btn btn-danger float-end"
                              >
                                Unenroll
                              </button>
                            ) : undefined
                          ) : (
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                enrollInCourse(course._id);
                              }}
                              className="btn btn-success float-end"
                            >
                              Enroll
                            </button>
                          )}
                        </EditProtection>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
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
//   setAllCourses,
//   setCourse,
//   setCourses,
// }: {
//   allCourses: any[];
//   courses: any[];
//   course: any;
//   setAllCourses: (courses: any[]) => void;
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
//     setAllCourses([...allCourses, newCourse]);
//   };

//   const deleteCourse = async (courseId: string) => {
//     await courseClient.deleteCourse(courseId);
//     setCourses(courses.filter((course) => course._id !== courseId));
//     setAllCourses(allCourses.filter((course) => course._id !== courseId));
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
//     setAllCourses(
//       allCourses.map((c) => {
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
//       <EditProtection role="FACULTY">
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
//                         <EditProtection role="FACULTY">
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
//                         <EditProtection role="FACULTY">
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

// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link } from "react-router-dom";
// // import EditProtection from "./Courses/EditProtection";
// // import { useEffect, useState } from "react";
// // import {
// //   addEnrollment,
// //   deleteEnrollment,
// //   setEnrollments,
// // } from "./Enrollments/reducer";
// // import * as userClient from "./Account/client";
// // import * as courseClient from "./Courses/client";

// // export default function Dashboard({
// //   allCourses,
// //   courses,
// //   course,
// //   setCourse,
// //   setCourses,
// // }: {
// //   allCourses: any[];
// //   courses: any[];
// //   course: any;
// //   setCourse: (course: any) => void;
// //   setCourses: (courses: any[]) => void;
// // }) {
// //   const { currentUser } = useSelector((state: any) => state.accountReducer);
// //   const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
// //   const dispatch = useDispatch();
// //   const fetchEnrollments = async () => {
// //     const enrollments = await courseClient.findEnrollmentsForCourse(
// //       course._id as string
// //     );
// //     dispatch(setEnrollments(enrollments));
// //   };
// //   useEffect(() => {
// //     fetchEnrollments();
// //   }, []);

// //   const createEnrollmentForCourse = async () => {
// //     const newEnrollment = { user: currentUser._id, course: course._id };
// //     const enrollment = await courseClient.createEnrollmentForCourse(
// //       course._id,
// //       newEnrollment
// //     );
// //     dispatch(addEnrollment(enrollment));
// //   };

// //   const [isEnrollments, setIsEnrollments] = useState(false);
// //   const [displayCourses, setDisplayCourses] = useState(courses);

// //   const handleEnrollmentsButton = () => {
// //     if (isEnrollments) {
// //       setDisplayCourses(courses);
// //     } else {
// //       setDisplayCourses(allCourses);
// //     }
// //   };

// //   const handleEnroll = () => {
// //     createEnrollmentForCourse();
// //   };

// //   const handleUnenroll = (course: any) => {
// //     dispatch(
// //       deleteEnrollment(
// //         enrollments.find(
// //           (enrollment: any) =>
// //             enrollment.user === currentUser._id &&
// //             enrollment.course === course._id
// //         )._id
// //       )
// //     );
// //   };

// //   const addNewCourse = async () => {
// //     const newCourse = await userClient.createCourse(course);
// //     setCourses([...courses, newCourse]);
// //   };

// //   const deleteCourse = async (courseId: string) => {
// //     await courseClient.deleteCourse(courseId);
// //     setCourses(courses.filter((course) => course._id !== courseId));
// //   };

// //   const updateCourse = async () => {
// //     await courseClient.updateCourse(course);
// //     setCourses(
// //       courses.map((c) => {
// //         if (c._id === course._id) {
// //           return course;
// //         } else {
// //           return c;
// //         }
// //       })
// //     );
// //   };

// //   return (
// //     <div id="wd-dashboard">
// //       {currentUser.role === "STUDENT" ? (
// //         <Button
// //           onClick={() => {
// //             setIsEnrollments(!isEnrollments);
// //             handleEnrollmentsButton();
// //           }}
// //           variant="primary"
// //           className="btn float-end"
// //           id="wd-delete-course-click"
// //         >
// //           Enrollments
// //         </Button>
// //       ) : undefined}
// //       <h1 id="wd-dashboard-title">Dashboard</h1>
// //       <hr />
// //       <EditProtection>
// //         <h5>
// //           New Course
// //           <button
// //             className="btn btn-primary float-end"
// //             id="wd-add-new-course-click"
// //             // onClick={() => dispatch(addCourse(course))}
// //             onClick={addNewCourse}
// //           >
// //             {" "}
// //             Add{" "}
// //           </button>
// //           <button
// //             className="btn btn-warning float-end me-2"
// //             // onClick={() => dispatch(updateCourse(course))}
// //             onClick={updateCourse}
// //             id="wd-update-course-click"
// //           >
// //             Update
// //           </button>
// //         </h5>

// //         <br />
// //         <FormControl
// //           value={course.name}
// //           className="mb-2"
// //           onChange={(e) => setCourse({ ...course, name: e.target.value })}
// //         />
// //         <Form.Control
// //           as="textarea"
// //           value={course.description}
// //           rows={3}
// //           onChange={(e) =>
// //             setCourse({ ...course, description: e.target.value })
// //           }
// //         />
// //         <hr />
// //       </EditProtection>
// //       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>{" "}
// //       <hr />
// //       <div id="wd-dashboard-courses">
// //         <Row xs={1} md={5} className="g-4">
// //           {displayCourses.map((course) => (
// //             <Col className="wd-dashboard-course" style={{ width: "300px" }}>
// //               <Card>
// //                 <>
// //                   {enrollments.some(
// //                     (enrollment: any) =>
// //                       enrollment.user === currentUser._id &&
// //                       enrollment.course === course._id
// //                   ) ? (
// //                     <Link
// //                       to={`/Kambaz/Courses/${course._id}/Home`}
// //                       className="wd-dashboard-course-link text-decoration-none text-dark"
// //                     >
// //                       <Card.Img
// //                         src={`/images/${course.image}`}
// //                         variant="top"
// //                         width="100%"
// //                         height={160}
// //                       />
// //                       <Card.Body className="card-body">
// //                         <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
// //                           {course.name}{" "}
// //                         </Card.Title>
// //                         <Card.Text
// //                           className="wd-dashboard-course-description overflow-hidden"
// //                           style={{ height: "100px" }}
// //                         >
// //                           {course.description}{" "}
// //                         </Card.Text>
// //                         <Button variant="primary"> Go </Button>
// //                         <EditProtection>
// //                           <button
// //                             onClick={(event) => {
// //                               event.preventDefault();
// //                               event.stopPropagation();
// //                               // dispatch(deleteCourse(course._id));
// //                               deleteCourse(course._id);
// //                             }}
// //                             className="btn btn-danger float-end"
// //                             id="wd-delete-course-click"
// //                           >
// //                             Delete
// //                           </button>
// //                           <button
// //                             id="wd-edit-course-click"
// //                             onClick={(event) => {
// //                               event.preventDefault();
// //                               event.stopPropagation();
// //                               setCourse(course);
// //                             }}
// //                             className="btn btn-warning me-2 float-end"
// //                           >
// //                             Edit
// //                           </button>
// //                         </EditProtection>
// //                         {isEnrollments ? (
// //                           <Button
// //                             onClick={(event) => {
// //                               event.preventDefault();
// //                               event.stopPropagation();
// //                               handleUnenroll(course);
// //                             }}
// //                             className="btn btn-danger float-end"
// //                             id="wd-delete-course-click"
// //                           >
// //                             Unenroll
// //                           </Button>
// //                         ) : undefined}
// //                       </Card.Body>
// //                     </Link>
// //                   ) : (
// //                     <div className="wd-dashboard-course-link text-decoration-none text-dark">
// //                       <Card.Img
// //                         src={`/images/${course.image}`}
// //                         variant="top"
// //                         width="100%"
// //                         height={160}
// //                       />
// //                       <Card.Body className="card-body">
// //                         <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
// //                           {course.name}{" "}
// //                         </Card.Title>
// //                         <Card.Text
// //                           className="wd-dashboard-course-description overflow-hidden"
// //                           style={{ height: "100px" }}
// //                         >
// //                           {course.description}{" "}
// //                         </Card.Text>
// //                         <Button variant="primary" disabled>
// //                           {" "}
// //                           Go{" "}
// //                         </Button>{" "}
// //                         <EditProtection>
// //                           <button
// //                             onClick={(event) => {
// //                               event.preventDefault();
// //                               event.stopPropagation();
// //                               // dispatch(deleteCourse(course._id));
// //                               deleteCourse(course._id);
// //                             }}
// //                             className="btn btn-danger float-end"
// //                             id="wd-delete-course-click"
// //                           >
// //                             Delete
// //                           </button>
// //                           <button
// //                             id="wd-edit-course-click"
// //                             onClick={(event) => {
// //                               event.preventDefault();
// //                               event.stopPropagation();
// //                               setCourse(course);
// //                             }}
// //                             className="btn btn-warning me-2 float-end"
// //                           >
// //                             Edit
// //                           </button>
// //                         </EditProtection>
// //                         {isEnrollments ? (
// //                           <Button
// //                             onClick={(event) => {
// //                               event.preventDefault();
// //                               event.stopPropagation();
// //                               handleEnroll();
// //                             }}
// //                             variant="success"
// //                             className="btn float-end"
// //                             id="wd-delete-course-click"
// //                           >
// //                             Enroll
// //                           </Button>
// //                         ) : undefined}
// //                       </Card.Body>
// //                     </div>
// //                   )}
// //                 </>
// //               </Card>
// //             </Col>
// //           ))}
// //         </Row>
// //       </div>
// //     </div>
// //   );
// // }
