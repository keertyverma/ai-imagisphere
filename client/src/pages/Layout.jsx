import { Outlet } from "react-router-dom";
import { NavBar } from "../components";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="w-full min-h-[calc(100vh-75px)] py-8 px-4 sm:px-8 bg-[#f9fafe]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
