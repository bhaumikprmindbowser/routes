import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (!isAuthenticated) return <>{children}</>;

  return <Navigate replace to="/home" state={{ from: pathname }} />;
};

export default PublicRoute;
