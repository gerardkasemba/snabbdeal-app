"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkStyle = `font-bold text-sm transition-colors duration-300 ${
    isScrolled || isOpen ? "text-black hover:text-[#FBB040]" : "text-white hover:text-[#FBB040]"
  }`;

  return (
    <nav
      className={`font p-4 fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-primary"
      }`}
    >
      <div className="container flex items-center justify-between mx-auto">
        <div>
          <Link href="/"><Image
            src={isScrolled ? "/logo/1.svg" : "/logo/2.svg"}
            width={150}
            height={150}
            alt="Logo"
          /></Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
        <div className="hidden ml-auto md:flex md:items-center md:space-x-4">
          <Link href="/"><span className={linkStyle}>Home</span></Link>
          <Link href="/help"><span className={linkStyle}>Help &#38; FAQ</span></Link>
          <Link href="/track"><span className={linkStyle}>Track Package</span></Link>
          <Link href="/create-order">
            <button
              className={`ml-4 bg-[#FBB040] text-white font-bold py-2 px-4 rounded transition-colors duration-300 hover:bg-[#e69a30]`}
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Drawer for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-black focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="flex flex-col mt-16 space-y-6 p-4">
          <Link href="/">
            <span className="text-black hover:text-[#FBB040] font-bold text-lg block text-center">
              Home
            </span>
          </Link>
          <Link href="/help">
            <span className="text-black hover:text-[#FBB040] font-bold text-lg block text-center">
              Help &#38; FAQ
            </span>
          </Link>
          <Link href="/track">
            <span className="text-black hover:text-[#FBB040] font-bold text-lg block text-center">
              Track Package
            </span>
          </Link>
          <Link href="/create-order">
            <button
              className="bg-[#FBB040] text-white font-bold py-2 px-4 rounded transition-colors duration-300 hover:bg-[#e69a30] w-full text-center"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Overlay for Drawer */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 z-40 bg-black opacity-50"
        />
      )}
    </nav>
  );
};

export default NavBar;
