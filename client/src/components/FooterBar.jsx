import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const FooterBar = () => {
  return (
    <footer className="bg-gray-600 py-4 flex items-center rounded-t-3xl min-h-28">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 justify-center md:justify-end ">
            <a href="https://www.facebook.com/ifredwan"
            target="_blank"
            rel="noopener noreferrer" 
             className="text-white text-[18px] hover:text-[#4267B2]">
              <FaFacebook />
            </a>
            <Link to="#" className="text-white hover:text-[#000000] text-[18px]">
            <FaXTwitter />
            </Link>
            <Link to="#" className="text-white hover:text-[#d62976] text-[18px]">
              <FaInstagram />
            </Link>
            <Link to="#" className="text-white hover:text-[#0077B5] text-[18px]">
              <FaLinkedin />
            </Link>
          </div>
          <div className="text-center md:text-left">
            <p className="text-white font-mono">© 2024 All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;

