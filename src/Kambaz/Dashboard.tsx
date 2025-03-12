/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditProtection from "./Courses/EditProtection";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { useState } from "react";
import { addEnrollment, deleteEnrollment } from "./Enrollments/reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [isEnrollments, setIsEnrollments] = useState(false);
  const [displayCourses, setDisplayCourses] = useState(
    courses.filter((course) =>
      enrollments.some(
        (enrollment: any) =>
          enrollment.user === currentUser._id &&
          enrollment.course === course._id
      )
    )
  );

  const handleEnrollmentsButton = () => {
    if (isEnrollments) {
      setDisplayCourses(
        courses.filter((course) =>
          enrollments.some(
            (enrollment: any) =>
              enrollment.user === currentUser._id &&
              enrollment.course === course._id
          )
        )
      );
    } else {
      setDisplayCourses(courses);
    }
  };

  const handleEnroll = (course: any) => {
    dispatch(addEnrollment({ userId: currentUser._id, courseId: course._id }));
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
            onClick={() => dispatch(addCourse(course))}
          >
            {" "}
            Add{" "}
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={() => dispatch(updateCourse(course))}
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
        <FormControl
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
                              dispatch(deleteCourse(course._id));
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
                              dispatch(deleteCourse(course._id));
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
                              handleEnroll(course);
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
