import { Modal, Button } from 'react-bootstrap';
import { deleteAssignment } from './reducer';
import { useDispatch } from 'react-redux';
import * as client from './client';
export default function AssignmentDeleteModal({
  show,
  handleClose,
  dialogTitle,
  assignmentId,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  assignmentId: string;
}) {
  const clickDelete = async () => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };
  const dispatch = useDispatch();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this assignment? This action is
        permanent and cannot be reversed.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {' '}
          Cancel{' '}
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            await clickDelete();
            handleClose();
          }}
        >
          {' '}
          Yes{' '}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
