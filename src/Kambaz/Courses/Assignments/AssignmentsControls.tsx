/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPlus } from "react-icons/fa6";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import EditProtection from "../EditProtection";
import { Link } from "react-router-dom";
export default function AssignmentsControls({
  cid,
  aid,
}: {
  cid: any;
  aid: any;
}) {
  return (
    <div
      id="wd-assignments-controls"
      className="text-nowrap d-flex align-items-center"
    >
      <InputGroup className="me-3" style={{ width: "300px" }}>
        <InputGroup.Text className="bg-white">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search assignments..."
          className="border-start-0"
          size="lg"
        />
      </InputGroup>
      <EditProtection>
        <div className="d-flex ms-auto">
          <Button
            variant="secondary"
            size="lg"
            className="me-1 float-end"
            id="wd-add-module-btn"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Group
          </Button>
          <EditProtection>
            <Link to={`/Kambaz/Courses/${cid}/Assignments/${aid}`}>
              <Button
                variant="danger"
                size="lg"
                className="me-1 float-end"
                id="wd-add-module-btn"
              >
                <FaPlus
                  className="position-relative me-2"
                  style={{ bottom: "1px" }}
                />
                Assignment
              </Button>
            </Link>
          </EditProtection>
        </div>
      </EditProtection>
    </div>
  );
}
