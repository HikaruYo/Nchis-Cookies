import React, { useState, useEffect } from "react";
import logo from "../asset/logo.png";
import google from "../asset/google.png";
import { auth, provider, signInWithPopup } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";
import { Eye, EyeOff } from "lucide-react"; // Import ikon

const ADMIN_EMAIL = "chachaius@yahoo.com";
const ADMIN_PASSWORD = "Nchis-Cookies2025";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk show/hide password
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      alert(`Welcome, ${user.displayName}`);
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminEmail === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD) {
      setUser({ email: adminEmail, role: "admin" });
      setShowLoginForm(false);
      navigate("/admin-dashboard");
    } else {
      alert("Login gagal! Gunakan Login Google untuk User.");
    }
    setTimeout(() => {
      setAdminEmail("");
      setAdminPassword("");
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/10 backdrop-blur-lg shadow-lg" : "bg-amber-950/0 lg:bg-black"
        } p-1`}
      >
        <div className="flex lg:justify-between items-center lg:px-20 px-4 py-2">
          <img src={logo} alt="logo" className="w-20 h-20 lg:h-28 lg:w-28"/>

          <div className="flex flex-col lg:flex-row justify-center">
            <a href="#home"
               className="text-white hover:text-yellow-400 mx-2 lg:mx-6 my-2 lg:my-0 lg:text-xl lg:font-semibold transition duration-300">
              Home
            </a>
            <a href="#about"
               className="text-white hover:text-yellow-400 mx-2 lg:mx-6 my-2 lg:my-0 lg:text-xl lg:font-semibold transition duration-300">
              About
            </a>
            <a href="#product"
               className="text-white hover:text-yellow-400 mx-2 lg:mx-6 my-2 lg:my-0 lg:text-xl lg:font-semibold transition duration-300">
              Product
            </a>
            <a href="#contact"
               className="text-white hover:text-yellow-400 mx-2 lg:mx-6 my-2 lg:my-0 lg:text-xl lg:font-semibold transition duration-300">
              Contact Us
            </a>

          </div>
            <div className="flex gap-3 items-center">
              <button
                className="bg-amber-800 border border-white w-20 lg:w-28 h-8 lg:h-10 flex items-center rounded-lg text-white font-medium hover:bg-amber-700 transition duration-300 px-2"
                onClick={handleGoogleLogin}
              >
                <img src={google} alt="login" className="w-4 lg:w-6"/>
                <span className="ml-2 text-sm lg:text-md">Login</span>
              </button>

              <button
                className="bg-gray-700 border border-white w-20 lg:w-28 h-8 lg:h-10 flex items-center rounded-lg text-white font-medium hover:bg-gray-600 transition duration-300 px-2"
                onClick={() => setShowLoginForm(true)}
              >
                <span className="mx-auto text-sm lg:text-md">Admin</span>
              </button>
            </div>
        </div>
      </nav>

      {/* Modal Login Admin */}
      {showLoginForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 border border-[#D7CCC8]">
            <h2 className="text-2xl font-bold text-[#5D4037] text-center mb-4">Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5D4037]">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-[#D7CCC8] bg-[#F5F5F5] rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#5D4037]"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-[#5D4037]">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 border border-[#D7CCC8] bg-[#F5F5F5] rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#5D4037] pr-10"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                {/* Tombol Show/Hide Password */}
                <button
                  type="button"
                  className="absolute top-9 right-3 text-[#5D4037] hover:text-[#4E342E] transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#D7CCC8] text-[#5D4037] rounded-lg hover:bg-[#BCAAA4] transition duration-300"
                  onClick={() => setShowLoginForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5D4037] text-white rounded-lg hover:bg-[#4E342E] transition duration-300"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
