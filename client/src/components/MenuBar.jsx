import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookie from "js-cookie";
import { logout } from "../apiRequest/api";
import { Menu, X } from "lucide-react";

const MenuBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLogin = Cookie.get("token");

  const logOutFunction = async () => {
    const result = await logout();
    if (result) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <section className="bg-gray-300 shadow-xl h-[80px] flex items-center">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="logo">
            <h1 className="font-extrabold text-gray-700 leading-none text-xl md:text-2xl cursor-pointer">
              <Link to="/">Ifrahim Redwan</Link>
            </h1>
          </div>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation */}
          <nav
            className={`absolute md:relative top-[80px] md:top-0 left-0 w-full md:w-auto bg-gray-300 md:bg-transparent flex flex-col md:flex-row items-center gap-4 md:gap-[15px] md:justify-center md:items-center md:transition-none transition-all duration-300 ease-in-out overflow-hidden z-50 ${
              isMobileMenuOpen ? "h-auto py-4" : "h-0 md:h-auto"
            }`}
          >
            <ul className="flex flex-col md:flex-row gap-4 md:gap-[15px]">
              <li className="px-[16px] py-[8px] hover:font-semibold">
                <Link to="/about" className="text-gray-600 font-mono">
                  About
                </Link>
              </li>
              <li className="px-[16px] py-[8px] hover:font-semibold">
                <Link to="/blog" className="text-gray-600 font-mono">
                  Blog
                </Link>
              </li>
              <li className="px-[16px] py-[8px] hover:font-semibold">
                <Link to="/service" className="text-gray-600 font-mono">
                  Service
                </Link>
              </li>
              <li className="px-[16px] py-[8px] hover:font-semibold">
                <Link to="/contact" className="text-gray-600 font-mono">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile Authentication Buttons */}
            {isMobileMenuOpen && (
              <div className="flex flex-col gap-4 mt-4 md:hidden">
                {isLogin ? (
                  <div className="">
                  <Link
                  to="/dashboard"
                  className="px-[16px] py-[8px] bg-gray-600 text-white rounded-md mr-3"
                >
                  Dashboard
                </Link>
                  <Link
                  onClick={logOutFunction}
                  to="/"
                  className="px-[16px] py-[8px] bg-gray-600 text-white rounded-md"
                >
                  Dashboard Logout
                </Link>
                </div>
                ) : (
                  <Link
                    to="/dashboard-login"
                    className="px-[16px] py-[8px] bg-gray-600 text-white rounded-md text-center "
                  >
                    Dashboard Login
                  </Link>
                )}
              </div>
            )}
          </nav>

          {/* Desktop Authentication Buttons */}
          <div className="hidden md:flex gap-[10px]">
            {isLogin ? (
              <div className="">
                <Link
                to="/dashboard"
                className="px-[16px] py-[8px] bg-gray-600 text-white rounded-md mr-3"
              >
                Dashboard
              </Link>
                <Link
                onClick={logOutFunction}
                to="/"
                className="px-[16px] py-[8px] bg-gray-600 text-white rounded-md"
              >
                Dashboard Logout
              </Link>
              </div>
            ) : (
              <Link
                to="/dashboard-login"
                className="px-[16px] py-[8px] bg-gray-600 text-white rounded-md"
              >
                Dashboard Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuBar;
