/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function SubAssignmentControlButtons({
  aid,
  removeAssignment,
}: {
  aid: any;
  removeAssignment: (aid: string) => void;
}) {
  return (
    <div className="d-flex gap-2 float-end">
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => {
          // dispatch(deleteAssignment(aid));
          removeAssignment(aid);
        }}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
