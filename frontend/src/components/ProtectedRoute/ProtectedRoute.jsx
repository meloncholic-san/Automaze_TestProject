import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {

    return <Navigate to="/auth/login" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;
