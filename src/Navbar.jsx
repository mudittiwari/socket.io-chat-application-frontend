import { Link } from "react-router-dom";
import { FaHome, FaRegComment, FaBell, FaUser,FaThumbsUp, FaComment } from 'react-icons/fa';
function Navbar()
{
    return (
        <>
            <nav className="flex justify-between px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="flex items-center">
          <img className="h-10 w-10" src="/logo.svg" alt="Logo" />
          <h1 className="text-white font-bold ml-2 text-xl">My App</h1>
        </div>
        <div className="flex items-center">
          <a href="#" className="text-white hover:text-gray-200 mr-6">
            <FaHome size={24} />
          </a>
          <Link to='/messages' className="text-white hover:text-gray-200 mr-6">
            <FaRegComment size={24} />
          </Link>
          <Link to="/notifications" className="text-white hover:text-gray-200 mr-6">
            <FaBell size={24} />
          </Link>
          <Link to="/profile" href="#" className="text-white hover:text-gray-200">
            <FaUser size={24} />
          </Link>
        </div>
      </nav>
        </>
    );
}

export default Navbar;