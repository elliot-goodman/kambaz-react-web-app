import { Button, ListGroup } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import AssignmentsControlButtons from './AssignmentsControlButtons';
import AssignmentButtons from './AssignmentButtons';
import { MdOutlineAssignment } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as assignmentsClient from './client';
import { setAssignments } from './reducer';
import { useEffect } from 'react';

export default function Assignments() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await assignmentsClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  return (
    <div>
      <div className="d-flex flex-row">
        <div className="input-group mb-3 float-left" style={{ width: '25%' }}>
          <span className="input-group-text" id="basic-addon1">
            <IoSearch />
          </span>
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
        {currentUser.role === 'FACULTY' && (
          <div className="ms-auto d-flex">
            <Button
              variant="secondary"
              size="lg"
              className="ms-2 mb-3"
              id="wd-add-group-btn"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: '1px' }}
              />
              Group
            </Button>
            <Button
              variant="danger"
              size="lg"
              className="ms-2 mb-3"
              id="wd-add-assignment-btn"
              href="#/Kambaz/Courses/RS101/Assignments/new"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: '1px' }}
              />
              Assignment
            </Button>
          </div>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <strong>ASSIGNMENTS</strong>
            <AssignmentsControlButtons />
          </div>

          <ListGroup className="rounded-0">
            {assignments.map((assignment: any) => (
              <div className="d-flex flex-row justify-content-between wd-assignment border">
                <a
                  href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                  style={{ textDecoration: 'none' }}
                  className="flex-grow-1 w-100"
                >
                  <ListGroup.Item className="border-0 p-3 ps-1 d-flex flex-row align-items-center flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" />
                    <MdOutlineAssignment color="green" className="fs-3 me-3" />
                    <div className="d-flex flex-column">
                      <strong>{assignment.title}</strong>
                      <div className="fs-6">
                        <strong className="text-danger">
                          Multiple Modules
                        </strong>{' '}
                        | <strong>Not available until</strong>{' '}
                        {assignment.available_at} | <strong>Due</strong>{' '}
                        {assignment.due_date} | {assignment.points} pts
                      </div>
                    </div>
                  </ListGroup.Item>
                </a>
                <div className="d-flex col-auto align-items-center">
                  <AssignmentButtons assignmentId={assignment._id} />
                </div>
              </div>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
