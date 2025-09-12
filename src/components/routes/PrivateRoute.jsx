import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  // If not logged in, redirect to admin login
  if(user && user.role==="vendor"){
    return <Navigate to="/" replace />;
  }
  else if (!user || user.role!=="admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
