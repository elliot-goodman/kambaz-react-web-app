import { IoEllipsisVertical } from 'react-icons/io5';
import GreenCheckmark from '../Modules/GreenCheckmark';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import AssignmentDeleteModal from './AssignmentDeleteModal';
export default function AssignmentButtons({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="ms-auto">
      {currentUser.role === 'FACULTY' && (
        <FaTrash
          className="text-danger me-2 mb-1"
          onClick={(e) => {
            e.stopPropagation();
            handleShow();
          }}
        />
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <AssignmentDeleteModal
        show={show}
        handleClose={handleClose}
        dialogTitle="Confirm Assignment Delete"
        assignmentId={assignmentId}
      />
    </div>
  );
}
