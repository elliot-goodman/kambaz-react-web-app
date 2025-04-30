import { AiOutlineStop } from 'react-icons/ai';
export default function GrayBlocked() {
  return (
    <span className="me-1 position-relative">
      <AiOutlineStop
        style={{ top: '2px' }}
        className="text-secondary me-1 fs-5"
      />
    </span>
  );
}
