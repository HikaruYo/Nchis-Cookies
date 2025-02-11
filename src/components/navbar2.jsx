import React, { useState, useEffect } from "react";
import logo from "../asset/logo.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser(); // Access context
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/20 backdrop-blur-lg shadow-lg" : "bg-transparent lg:bg-black"
      } p-3`}
    >
      <div className="flex justify-between items-center px-5 lg:px-20 py-2">
        <img src={logo} alt="logo" className="w-16 h-16 lg:h-20 lg:w-20" />

        <div
          className={`lg:flex gap-6 text-start ${
            isOpen
              ? "absolute top-20 left-0 w-full backdrop-blur bg-black/90 flex flex-col items-center py-5"
              : "hidden lg:flex"
          }`}
        >
          {[
            "Home",
            "About",
            "Product",
            "Contact Us",
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-yellow-400 text-lg font-semibold py-2 px-4 flex text-start"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user && <span className="text-white font-medium mr-4">Hello, {user.displayName}</span>}
          <button
            className="bg-red-600 border border-white lg:w-28 lg:h-10 w-20 h-8 flex justify-center items-center rounded-lg text-white font-medium hover:bg-red-700 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
          >
            {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
