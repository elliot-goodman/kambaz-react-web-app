/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import { ListGroup } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import SubAssignmentControlButtons from "./SubAssignmentControlButtons";
import { RiArrowDownSFill } from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function Assignments({ cid }: { cid: any }) {
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const course = assignments.filter(
    (assignment: { course: any }) => assignment.course === cid
  );

  return (
    <div id="wd-assignments">
      <AssignmentsControls cid={cid} aid={uuidv4()} />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <RiArrowDownSFill className="me-2 fs-3" />
            <b>ASSIGNMENTS</b>
            <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-module rounded-0">
            {course.map((assignment: any) => (
              <div
                key={assignment._id}
                className="list-group-item wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/Kambaz/Courses/${cid}/Assignments/${assignment._id}`
                  )
                }
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex mr-3">
                    <BsGripVertical className="me-2 fs-3" />
                    <LuNotebookPen
                      className="me-2 fs-3"
                      style={{ color: "green" }}
                    />
                  </div>
                  <div>
                    <div className="wd-text-bold">{assignment.title}</div>
                    <div className="wd-text-small">
                      <span className="wd-text-red">Multiple Modules</span> |{" "}
                      <span className="wd-text-bold">Not Available Until</span>{" "}
                      {assignment.start} |{" "}
                      <span className="wd-text-bold">Due</span> {assignment.due}
                    </div>
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  {" "}
                  <SubAssignmentControlButtons aid={assignment._id} />
                </div>
              </div>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
