import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser, enrollments } = useSelector(
    (state: any) => state.accountReducer
  );
  const { cid } = useParams();
  if (currentUser) {
    if (cid && !enrollments.some((e: any) => e.course === cid)) {
      return <Navigate to="/Kambaz/Dashboard" />;
    }
    return children;
  }
  return <Navigate to="/Kambaz/Account/Signin" />;
}
