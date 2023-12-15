import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { authApi } from "../reducer/services/authApi";
import BaseLayout from "./BaseLayout";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const fetchUser = authApi.endpoints.getMe;
  let req;

  if (token === null) return <Navigate to="/login" />;
  if (!user) req = dispatch(fetchUser.initiate(null, { forceRefetch: true, subscribe: false }));

  if (req) {
    return (
      <LoadingScreen>
        <p>
          <span className="animate-bounce inline-block mr-2">Getting</span>
          <span className="animate-bounce animate-delay-100 inline-block mr-2">user</span>
          <span className="animate-bounce animate-delay-200 inline-block">information</span>
        </p>
      </LoadingScreen>
    );
  }
  return <BaseLayout />;
};

export default ProtectedRoutes;
