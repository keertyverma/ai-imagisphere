import { Link } from "react-router-dom";
import { logo } from "../assets";

const NavBar = () => {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-4 sm:px-8 bg-white border-b border-b-[#e6ebf4] ">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>
      <Link
        to="/create-post"
        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
      >
        Create
      </Link>
    </nav>
  );
};

export default NavBar;
