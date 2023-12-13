import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { authApi } from "../reducer/services/authApi";
import Navbar from "./Navbar";

const BaseLayout = () => {
  return (
    <>
      <main className="bg-[#fcf7f4] min-h-screen">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};
const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  if (token === null) return <Navigate replace to="/" />;
  if (!user) dispatch(authApi.endpoints.getMe.initiate(null, { forceRefetch: true }));

  return user ? (
    <BaseLayout />
  ) : (
    <LoadingScreen>
      <p>
        <span className="animate-bounce inline-block mr-2">Getting</span>
        <span className="animate-bounce animate-delay-100 inline-block mr-2">user</span>
        <span className="animate-bounce animate-delay-200 inline-block">information...</span>
      </p>
    </LoadingScreen>
  );
};

export default ProtectedRoutes;
