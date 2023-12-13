import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import LogoKanji from "../components/LogoKanji";
import { useLoginMutation } from "../reducer/services/authApi";

const Login = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [doLogin, { isLoading }] = useLoginMutation();

  const handleSubmit = (/** @type {React.FormEvent<HTMLFormElement>} */ e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Please enter username and password");
      return;
    }
    doLogin({ username, password })
      .unwrap()
      .then(() => navigate("/home"))
      .catch((err) => {
        setMessage(err.data.message);
      });
  };
  if (token) return <Navigate to="/home" />;
  return (
    <main className="bg-[#fcf7f4]">
      <div className="container mx-auto h-screen">
        <div className="sm:w-1/2 h-full w-full m-auto flex px-5 sm:px-0 items-center justify-center">
          <div className="w-full -mt-28">
            <LogoKanji className="sm:text-6xl text-3xl" />
            <h6 className="sm:text-base text-sm text-center text-gray-500 mb-8">Japanese club at its finest.</h6>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Username"
                className="mb-3"
                onChange={({ target }) => {
                  setUsername(target.value);
                  setMessage(null);
                }}
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={({ target }) => {
                  setPassword(target.value);
                  setMessage(null);
                }}
              />
              <label className="text-sm">
                <input type="checkbox" onChange={() => setShowPassword(!showPassword)} className="inline-block mr-2" />
                Show Password
              </label>
              {message && <p className="text-red-500">{message}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-5 rounded bg-red-800 text-white px-4 py-2 w-full font-bold enabled:hover:bg-red-900 disabled:bg-gray-600"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
