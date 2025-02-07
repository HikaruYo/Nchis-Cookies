import React from "react";
import { useUser } from "./userContext"; // Import User Context
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react"; // Import ikon ditolak dari Lucide

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user || user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <XCircle className="w-24 h-24 text-red-600 mb-4" /> 
        <h1 className="text-4xl font-bold">Access Denied</h1>
        <p className="text-lg text-gray-300 mt-2">
          Mohon Login untuk Mengakses halaman ini.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition duration-300"
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
