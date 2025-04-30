import { IoEllipsisVertical } from 'react-icons/io5';
import { BsPlus } from 'react-icons/bs';
export default function AssignmentsControlButtons() {
  return (
    <div className="d-flex flex-row float-end">
      <div className="border border-2 rounded-pill ps-2 pe-2">40% of Total</div>
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4 mt-1" />
    </div>
  );
}
