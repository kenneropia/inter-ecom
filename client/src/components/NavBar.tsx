import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { getUser, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="py-4 bg-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-700">
              Ecom
            </Link>
          </div>
          <div className="flex justify-center mt-2 md:mt-0 md:block">
            {getUser() ? (
              <div className="flex items-baseline space-x-4 md:ml-10">
                <Link
                  to="/order"
                  className="px-3 py-2 text-sm font-medium text-blue-700"
                >
                  Orders
                </Link>
                <Link
                  to="/"
                  className="px-3 py-2 text-sm font-medium text-blue-700"
                >
                  Products
                </Link>
                <Link
                  to="/cart"
                  className="px-3 py-2 text-sm font-medium text-blue-700"
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
