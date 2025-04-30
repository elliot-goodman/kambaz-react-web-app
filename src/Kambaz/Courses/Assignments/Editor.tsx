import { Button, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, updateAssignment } from './reducer';
import { useState } from 'react';
import * as client from './client';

export default function AssignmentEditor() {
  // This function is from a StackOverflow article to format a date from readable format to YYYY-MM-DD
  function formatDate(dateStr: string) {
    const currentYear = new Date().getFullYear();
    const [monthDay] = dateStr.split(' at ');
    const date = new Date(`${monthDay}, ${currentYear}`);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day

    return `${year}-${month}-${day}`;
  }

  // This function is from a StackOverflow article to format a date from YYYY-MM-DD to readable format
  function formatToReadableDate(dateStr: string) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Month is 0-indexed in JS Date
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options as any);

    return `${formattedDate} at 12:00 am`;
  }

  const dispatch = useDispatch();
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [assignment, setAssignment] = useState<any>(
    assignments.find((assignment: any) => aid === assignment._id) || {
      course: cid,
    }
  );

  const createNewAssignment = async () => {
    await client.createAssignmentForCourse(cid as string, assignment);
    dispatch(addAssignment(assignment));
  };

  const updateExistingAssignment = async () => {
    await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const isNewAssignment: boolean = aid === 'new';

  return (
    <div className="ms-4" id="wd-assignments-editor">
      <Row>
        <label htmlFor="wd-name">Assignment Name</label>
      </Row>
      <Row>
        <input
          className="form-control"
          type="text"
          id="wd-name"
          value={assignment?.title || 'New Assignment'}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </Row>
      <Row className="mt-3">
        <textarea
          className="form-control"
          id="wd-name"
          rows={6}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        >
          {assignment?.description || 'New assignment description'}
        </textarea>
      </Row>
      <Row className="mt-3">
        <Col xs={3}>
          <label className="float-end" htmlFor="wd-points">
            Points
          </label>
        </Col>
        <Col>
          <input
            className="form-control"
            type="number"
            id="wd-points"
            value={assignment?.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={3}>
          <label className="float-end" htmlFor="wd-group">
            Assignment Group
          </label>
        </Col>
        <Col>
          <select className="form-select" id="wd-group">
            <option selected value="ASSIGNMENTS">
              Assignments
            </option>
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="PROJECT">Project</option>
          </select>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={3}>
          <label className="float-end" htmlFor="wd-display-grade-as">
            Display Grade as
          </label>
        </Col>
        <Col>
          <select className="form-select" id="wd-display-grade-as">
            <option selected value="PERCENTAGE">
              Percentage
            </option>
            <option value="POINTS">Points</option>
            <option value="LETTER">Letter Grade</option>
          </select>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={3}>
          <label className="float-end">Submission Type</label>
        </Col>
        <Col>
          <div className="form-control">
            <select className="form-select mt-2" id="wd-submission-type">
              <option selected value="ONLINE">
                Online
              </option>
              <option value="PHYSICAL">Physical Copy</option>
            </select>
            <br />
            <strong className="mt-3">Online Entry Options</strong>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="wd-text-entry"
              />
              <label className="form-check-label" htmlFor="wd-text-entry">
                Text Entry
              </label>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="wd-website-url"
              />
              <label className="form-check-label" htmlFor="wd-website-url">
                Website URL
              </label>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="wd-media-recordings"
              />
              <label className="form-check-label" htmlFor="wd-media-recordings">
                Media Recordings
              </label>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="wd-student-annotation"
              />
              <label
                className="form-check-label"
                htmlFor="wd-student-annotation"
              >
                Student Annotation
              </label>
            </div>
            <div className="form-check mt-3 mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="wd-file-upload"
              />
              <label className="form-check-label" htmlFor="wd-file-upload">
                File Uploads
              </label>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={3}>
          <label className="float-end">Assign</label>
        </Col>
        <Col>
          <div className="form-control">
            <label htmlFor="wd-assign-to">
              <strong className="mt-2">Assign to</strong>
            </label>
            <input
              className="form-control"
              type="text"
              id="wd-points"
              value="Everyone"
            />
            <label className="mt-2" htmlFor="wd-due-date">
              <strong>Due</strong>
            </label>
            <input
              className="form-control"
              type="date"
              id="wd-due-date"
              value={assignment?.due_date && formatDate(assignment?.due_date)}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  due_date: formatToReadableDate(e.target.value),
                })
              }
            />
            <div className="d-flex flex-row justify-content-evenly mb-3">
              <div className="me-2" style={{ width: '100%' }}>
                <label className="mt-2" htmlFor="wd-available-from">
                  <strong>Available from</strong>
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="wd-available-from"
                  value={
                    assignment?.available_at &&
                    formatDate(assignment?.available_at)
                  }
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      available_at: formatToReadableDate(e.target.value),
                    })
                  }
                />
              </div>
              <div style={{ width: '100%' }}>
                <label className="mt-2" htmlFor="wd-until">
                  <strong>Until</strong>
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="wd-until"
                  value={
                    assignment?.available_until &&
                    formatDate(assignment?.available_until)
                  }
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      available_until: formatToReadableDate(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <hr />
      <div className="d-flex flex-row justify-content-end">
        <Button
          href={`#/Kambaz/Courses/${cid}/Assignments`}
          variant="secondary"
          className="ms-2 mb-3"
          id="wd-add-group-btn"
        >
          Cancel
        </Button>
        <Button
          onClick={() =>
            isNewAssignment ? createNewAssignment() : updateExistingAssignment()
          }
          href={`#/Kambaz/Courses/${cid}/Assignments`}
          variant="danger"
          className="ms-2 mb-3"
          id="wd-add-group-btn"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
