import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminPrivateRoute({ children }) {
  const { token } = useSelector((state) => state.adminAuth);

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Logged in
  return children;
}
