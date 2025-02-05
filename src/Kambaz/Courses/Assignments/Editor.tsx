import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <div className="wd-margin-top">
        <Form.Group as={Row} className="mb-3" controlId="email1">
          <FormLabel>Assignment Name</FormLabel>
          <Col sm={10}>
            <Form.Control />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="textarea2">
          <Col sm={10}>
            <Form.Control
              as="textarea"
              style={{ height: "300px" }}
              placeholder="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section. Links to each of the lab assignments. Link to the Kanbaz application. Links to all relevant source code repositories. The Kanbaz application should include a link to navigate back to the landing page."
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
            <Form.Control id="wd-points-form" type="number" placeholder="100" />
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
              <FormControl type="datetime-local" id="wd-due-form"></FormControl>
              <div className="wd-margin-top-small">
                <Row>
                  <Col sm={6}>
                    <FormLabel className="wd-text-bold">
                      Available From
                    </FormLabel>
                    <FormControl
                      type="datetime-local"
                      id="wd-due-form"
                    ></FormControl>
                  </Col>
                  <Col sm={6}>
                    <FormLabel className="wd-text-bold">Until</FormLabel>
                    <FormControl
                      type="datetime-local"
                      id="wd-due-form"
                    ></FormControl>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Form.Group>
      </div>
      <hr className="wd-margin-editor-inputs wd-margin-top" />
      <div className="d-flex ms-auto justify-content-end wd-margin-editor-inputs">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 float-end"
          id="wd-add-module-btn"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-module-btn"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
