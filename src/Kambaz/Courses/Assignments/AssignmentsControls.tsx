import { FaPlus } from "react-icons/fa6";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
export default function ModulesControls() {
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
      </div>
    </div>
  );
}
