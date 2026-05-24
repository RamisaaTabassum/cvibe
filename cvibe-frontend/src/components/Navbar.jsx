import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-bold text-purple-600">
          CVibe
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-purple-600 transition">
            Home
          </Link>
          <Link to="/templates" className="text-gray-600 hover:text-purple-600 transition">
            Templates
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-purple-600 transition">
            Login
          </Link>
          <Link to="/register" 
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Get Started
          </Link>
        </div>

        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 px-2">
          <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
          <Link to="/templates" className="text-gray-600 hover:text-purple-600">Templates</Link>
          <Link to="/login" className="text-gray-600 hover:text-purple-600">Login</Link>
          <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-center">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;