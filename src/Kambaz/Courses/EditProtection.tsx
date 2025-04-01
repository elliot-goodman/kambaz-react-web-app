/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
export default function EditProtection({
  role,
  children,
}: {
  role: string;
  children: any;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role === role) {
    return children;
  } else {
    return;
  }
}
