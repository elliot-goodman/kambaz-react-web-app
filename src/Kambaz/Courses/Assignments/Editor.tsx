/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import EditProtection from "../EditProtection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor({ cid }: { cid: any }) {
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const { aid } = useParams();

  const [assignment, setAssignment] = useState<any>({
    _id: `${aid}`,
    title: "New Assignment",
    course: `${cid}`,
    start: "May 6 12:00am",
    due: "May 13 11:59pm",
    start_date: "2023-05-06T00:00",
    due_date: "2023-05-13T23:59",
    description: "New Description",
    points: "100",
  });

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignmentData = { assignmentData: assignment };
    console.log("newAssignmentData", newAssignmentData);
    const createdAssignment = await coursesClient.createAssignmentForCourse(
      cid,
      newAssignmentData
    );
    console.log("createdAssignment", createdAssignment);
    dispatch(addAssignment(createdAssignment));
  };

  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const editing = assignments.some((assignment: any) => assignment._id === aid);

  useEffect(() => {
    if (editing) {
      const existingAssignment = assignments.find(
        (assignment: any) => assignment._id === aid
      );
      setAssignment(existingAssignment);
    }
  }, [assignments, aid, editing]);

  return (
    <div id="wd-assignments-editor">
      <div className="wd-margin-top">
        <Form.Group as={Row} className="mb-3" controlId="email1">
          <FormLabel>{assignment && assignment.title}</FormLabel>
          <Col sm={10}>
            <Form.Control
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
              placeholder={!editing ? assignment.title : undefined}
              value={editing ? assignment.title : undefined}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="textarea2">
          <Col sm={10}>
            <Form.Control
              as="textarea"
              style={{ height: "300px" }}
              placeholder={!editing ? assignment.description : undefined}
              value={editing ? assignment.description : undefined}
              onChange={(e) =>
                setAssignment({ ...assignment, description: e.target.value })
              }
            />
          </Col>
        </Form.Group>
      </div>
      <div className="wd-margin-editor-inputs">
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            htmlFor="wd-points-form"
            className="text-end"
          >
            {" "}
            Points{" "}
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              id="wd-points-form"
              type="number"
              placeholder={!editing ? assignment.points : undefined}
              value={editing ? assignment.points : undefined}
              onChange={(e) =>
                setAssignment({ ...assignment, points: e.target.value })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            htmlFor="wd-group-form"
            className="text-end"
          >
            {" "}
            Assignment Group{" "}
          </Form.Label>
          <Col sm={10}>
            <FormSelect id="wd-group-form">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </FormSelect>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            htmlFor="wd-grade-form"
            className="text-end"
          >
            {" "}
            Display Grade as{" "}
          </Form.Label>
          <Col sm={10}>
            <FormSelect id="wd-grade-form">
              <option selected>Percentage</option>
              <option value="1">Number</option>
            </FormSelect>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            htmlFor="wd-box-dropdown"
            className="text-end"
          >
            {" "}
            Submission Type{" "}
          </Form.Label>
          <Col sm={10}>
            {" "}
            <div className="p-3 border wd-rounded-corners">
              {" "}
              {/* box with padding and border */}
              <Form.Select id="wd-box-dropdown">
                <option>Online</option>
                <option value="1">Hard Copy</option>
              </Form.Select>
              <FormLabel className="wd-text-bold wd-margin-top-small">
                Online Entry Options
              </FormLabel>
              <Col sm={{ span: 10 }}>
                <Form.Check
                  type="checkbox"
                  id="wd-text-entry-checkbox"
                  label="Text Entry"
                />
                <Form.Check
                  type="checkbox"
                  id="wd-url-checkbox"
                  label="Website URL"
                />
                <Form.Check
                  type="checkbox"
                  id="wd-recordings-checkbox"
                  label="Media Recordings"
                />
                <Form.Check
                  type="checkbox"
                  id="wd-annotations-checkbox"
                  label="Student Annotations"
                />
                <Form.Check
                  type="checkbox"
                  id="wd-uploads-checkbox"
                  label="File Uploads"
                />
              </Col>
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            htmlFor="wd-assign-form"
            className="text-end"
          >
            {" "}
            Assign{" "}
          </Form.Label>
          <Col sm={10}>
            {" "}
            <div className="p-3 border wd-rounded-corners">
              {" "}
              {/* box with padding and border */}
              <FormLabel className="wd-text-bold">Assign To</FormLabel>
              <Form.Select id="wd-assign-form">
                <option>Everyone</option>
              </Form.Select>
              <FormLabel className="wd-text-bold wd-margin-top-small">
                Due
              </FormLabel>
              <FormControl
                type="datetime-local"
                id="wd-due-form"
                value={`${assignment && assignment.due_date}`}
                onChange={(e) =>
                  setAssignment({ ...assignment, due_date: e.target.value })
                }
              ></FormControl>
              <div className="wd-margin-top-small">
                <Row>
                  <Col sm={6}>
                    <FormLabel className="wd-text-bold">
                      Available From
                    </FormLabel>
                    <FormControl
                      type="datetime-local"
                      id="wd-due-form"
                      value={`${assignment && assignment.start_date}`}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          start_date: e.target.value,
                        })
                      }
                    ></FormControl>
                  </Col>
                  <Col sm={6}>
                    <FormLabel className="wd-text-bold">Until</FormLabel>
                    <FormControl
                      type="datetime-local"
                      id="wd-due-form"
                      value={`${assignment && assignment.due_date}`}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          due_date: e.target.value,
                        })
                      }
                    ></FormControl>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Form.Group>
      </div>
      <hr className="wd-margin-editor-inputs wd-margin-top" />
      <EditProtection role="FACULTY">
        <div className="d-flex ms-auto justify-content-end wd-margin-editor-inputs">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button
              variant="secondary"
              size="lg"
              className="me-1 float-end"
              id="wd-add-module-btn"
            >
              Cancel
            </Button>
          </Link>
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`}
            onClick={() => {
              if (editing) {
                // dispatch(updateAssignment(assignment));
                console.log("editing assignment", assignment);
                saveAssignment(assignment);
              } else {
                // dispatch(addAssignment(assignment));
                createAssignmentForCourse();
              }
            }}
          >
            <Button
              variant="danger"
              size="lg"
              className="me-1 float-end"
              id="wd-add-module-btn"
            >
              Save
            </Button>
          </Link>
        </div>
      </EditProtection>
    </div>
  );
}
