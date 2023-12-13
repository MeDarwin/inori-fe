import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import LogoKanji from "../components/LogoKanji";
import { useLogoutMutation } from "../reducer/services/authApi";

const Navbar = () => {
  const navigate = useNavigate();
  const [doLogout, { isLoading }] = useLogoutMutation();
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {isLoading && <LoadingScreen>Logging out...</LoadingScreen>}
      <nav className="bg-red-800 bg-opacity-60 hover:bg-opacity-100 p-4 fixed top-0 w-full backdrop-blur-sm">
        <div className="mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <LogoKanji
              className="sm:text-3xl text-2xl text-white hover:cursor-pointer"
              onClick={() => navigate("/home")}
              onAuxClick={() => window.open("/home", "_blank")}
            />
          </div>
          <div>
            <Link to={"/home"} className="text-white">
              Magazine
            </Link>
            <Link to={"/home"} className="text-white">
              Magazine
            </Link>
          </div>
          <div className="group/user flex items-center relative">
            <p className="text-white mx-2">
              Konnichiwa, <span className="font-bold italic">{user?.username}</span>
            </p>
            <div className="invisible group-hover/user:visible absolute bg-red-800 w-full p-2">
              <button
                className="bg-white text-red-800 py-1 w-full rounded-lg text-sm"
                onClick={doLogout}
                disabled={isLoading}
                type="button"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
