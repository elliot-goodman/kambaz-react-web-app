import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
export default function AssignmentControlButtons() {
  return (
    <div className="d-flex gap-2 float-end">
      <div className="border border-black rounded-4 px-2 me-2">
        40% of Total
      </div>
      <div className="d-flex gap-2 float-end">
        <BsPlus className="fs-4" />
        <IoEllipsisVertical className="fs-4" />
      </div>
    </div>
  );
}
