import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { getUser, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex md:flex-row flex-col justify-center items-center md:justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-700">
              Ecom
            </Link>
          </div>
          <div className="flex md:mt-0 mt-2 justify-center md:block">
            {getUser() ? (
              <div className="md:ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 text-sm font-medium text-blue-700"
                >
                  Products
                </Link>
                <Link
                  to="/cart"
                  className="px-3 py-2 text-sm font-medium  text-blue-700"
                >
                  Cart
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="px-3 py-2 text-sm font-medium text-blue-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="md:ml-10">
                <Link to="/login" className="text-sm font-medium text-blue-700">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
