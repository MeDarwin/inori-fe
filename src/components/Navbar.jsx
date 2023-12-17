import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authApi, useLogoutMutation } from "../reducer/services/authApi";
import LoadingScreen from "./LoadingScreen";
import LogoKanji from "./LogoKanji";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [doLogout, { isLoading }] = useLogoutMutation();
  let req;

  if (token && !user) req = dispatch(authApi.endpoints.getMe.initiate(null, { forceRefetch: true, subscribe: false }));
  return (
    <>
      {isLoading && <LoadingScreen>Logging out...</LoadingScreen>}
      <nav className="transition text-red-950 hover:border-b-0 border-b-2 z-40 border-red-800 hover:text-white bg-red-800 bg-opacity-0 hover:bg-opacity-100 px-1 sm:px-4 py-4 fixed top-0 w-full backdrop-blur-md shadow-md shadow-red-800">
        <div className="mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <LogoKanji
              className="sm:text-3xl text-2xl hover:cursor-pointer"
              onClick={() => navigate("/")}
              onAuxClick={() => window.open("/", "_blank")}
            />
          </div>
          <div className="hidden sm:flex items-center gap-5">
            <Link to={"/magazine"}>Magazine</Link>
            <Link to={"/"}>Home</Link>
            {user && user.role !== "member" && <Link to={"/dashboard"}>Dashboard</Link>}
            {user && <Link to={"/profile"}>Profile</Link>}
          </div>
          {user ? (
            <div className="group/user flex items-center gap-5 relative">
              <p className="mx-2 text-sm sm:text-base">
                Konnichiwa, <span className="font-bold italic">{user?.username}</span>
              </p>
              <div className="transition-all opacity-0 group-hover/user:opacity-100 absolute w-full p-2">
                <button
                  className="bg-white text-red-800 py-1 w-full rounded-lg text-sm"
                  onClick={() =>
                    doLogout()
                      .unwrap()
                      .then(() => window.location.reload())
                  }
                  disabled={isLoading}
                  type="button"
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          ) : req ? (
            <p>Getting user information...</p>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
