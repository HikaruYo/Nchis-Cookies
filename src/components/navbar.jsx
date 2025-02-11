import React, { useState, useEffect } from "react";
import logo from "../asset/logo.png";
import google from "../asset/google.png";
import { auth, provider, signInWithPopup } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";
import { Eye, EyeOff, Menu, X } from "lucide-react";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/20 backdrop-blur-lg shadow-lg" : "bg-transparent lg:bg-black"
        } p-3`}
      >
        <div className="flex justify-between items-center px-5 lg:px-20 py-2">
          <img src={logo} alt="logo" className="w-16 h-16 lg:h-20 lg:w-20" />

          <div className={`lg:flex gap-6 text-start ${menuOpen ? "absolute top-20 left-0 w-full bg-black/90 flex flex-col items-center py-5" : "hidden lg:flex"}`}>
            {["Home", "About", "Product", "Contact Us"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-white hover:text-yellow-400 text-lg font-semibold py-2 px-4 text-start">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex bg-amber-800 border border-white w-24 h-10 items-center rounded-lg text-white font-medium hover:bg-amber-700 px-3"
              onClick={handleGoogleLogin}
            >
              <img src={google} alt="login" className="w-5" />
              <span className="ml-2">Login</span>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
              {menuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
            </button>

            <button
            className="hidden lg:flex bg-gray-700 border border-white w-24 h-10 items-center justify-center rounded-lg text-white font-medium hover:bg-gray-600 px-3"
            onClick={() => setShowLoginForm(true)}
          >
            Admin
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
