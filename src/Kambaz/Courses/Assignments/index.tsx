import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import { ListGroup } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import SubAssignmentControlButtons from "./SubAssignmentControlButtons";
import { RiArrowDownSFill } from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentsControls />
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
            <a
              href="#/Kambaz/Courses/1234/Assignments/123"
              className="list-group-item wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center"
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
                  <div className="wd-text-bold">A1 - ENV + HTML</div>
                  <div className="wd-text-small">
                    <span className="wd-text-red">Multiple Modules</span> |{" "}
                    <span className="wd-text-bold">Not Available Until</span>{" "}
                    May 6 at 12:00am | <span className="wd-text-bold">Due</span>{" "}
                    May 13 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <SubAssignmentControlButtons />
            </a>
            <a
              href="#/Kambaz/Courses/1234/Assignments/123"
              className="list-group-item wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center"
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
                  <div className="wd-text-bold">A2 - CSS + BOOTSTRAP</div>
                  <div className="wd-text-small">
                    <span className="wd-text-red">Multiple Modules</span> |{" "}
                    <span className="wd-text-bold">Not Available Until</span>{" "}
                    May 13 at 12:00am |{" "}
                    <span className="wd-text-bold">Due</span> May 20 at 11:59pm
                    | 100 pts
                  </div>
                </div>
              </div>
              <SubAssignmentControlButtons />
            </a>
            <a
              href="#/Kambaz/Courses/1234/Assignments/123"
              className="list-group-item wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center"
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
                  <div className="wd-text-bold">A3 - JAVASCRIPT + REACT</div>
                  <div className="wd-text-small">
                    <span className="wd-text-red">Multiple Modules</span> |{" "}
                    <span className="wd-text-bold">Not Available Until</span>{" "}
                    May 20 at 12:00am |{" "}
                    <span className="wd-text-bold">Due</span> May 27 at 11:59pm
                    | 100 pts
                  </div>
                </div>
              </div>
              <SubAssignmentControlButtons />
            </a>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
