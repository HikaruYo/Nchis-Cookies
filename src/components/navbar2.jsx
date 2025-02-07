import React, { useState, useEffect } from "react";
import logo from "../asset/logo.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser(); // Access context
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/10 backdrop-blur-lg shadow-lg" : "bg-amber-950/0 lg:bg-black"
      } p-1`}
    >
      <div className="flex lg:justify-between items-center">
        <div className="flex items-center lg:mx-20">
          <img src={logo} alt="logo" className="w-20 h-20 lg:h-28 lg:w-28" />
        </div>

        <div
          className={`lg:flex items-center ${
            isOpen ? "block" : "hidden"
          } transition-all duration-300`}
        >
          <div className="flex flex-col lg:flex-row justify-center">
            <a href="#home" className="text-white hover:text-yellow-400 mx-2 lg:mx-6 my-2 lg:my-0 lg:text-xl lg:font-semibold transition duration-300">
              Home
            </a>
            <a href="#about" className="text-white hover:text-yellow-400 mx-2 lg:mx-6 my-2 lg:my-0 lg:text-xl lg:font-semibold transition duration-300">
              About
            </a>
            <a href="#product" className="text-white hover:text-yellow-400 mx-2 lg:mx-6 my-2 lg:my-0 lg:text-xl lg:font-semibold transition duration-300">
              Product
            </a>
            <a href="#contact" className="text-white hover:text-yellow-400 mx-2 lg:mx-6 my-2 lg:my-0 lg:text-xl lg:font-semibold transition duration-300">
              Contact Us
            </a>
          </div>
        </div>

        <div className="flex items-center lg:mx-20">
          {user && <span className="text-white font-medium mr-4">Hello, {user.displayName}</span>}
          <button
            className="bg-red-600 border border-white lg:w-28 lg:h-10 w-20 h-8 flex justify-center items-center rounded-lg text-white font-medium hover:bg-red-700 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
