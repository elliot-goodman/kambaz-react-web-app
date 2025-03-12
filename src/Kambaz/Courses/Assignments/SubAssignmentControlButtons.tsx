/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import { useDispatch } from "react-redux";
export default function SubAssignmentControlButtons({ aid }: { aid: any }) {
  const dispatch = useDispatch();

  return (
    <div className="d-flex gap-2 float-end">
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => {
          dispatch(deleteAssignment(aid));
        }}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
