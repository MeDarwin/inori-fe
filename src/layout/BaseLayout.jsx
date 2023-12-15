import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

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
export default BaseLayout;
