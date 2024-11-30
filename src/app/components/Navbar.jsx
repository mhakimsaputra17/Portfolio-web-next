"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { motion } from "framer-motion";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed mx-auto top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out
        ${scrolled ? "bg-[#121212] bg-opacity-95 backdrop-blur-sm border-b border-[#33353F]" : "bg-transparent"}
      `}
    >
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link href={"/"} className="group">
          <motion.span
            className="text-2xl md:text-4xl text-white font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text hover:text-transparent transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            リムル
          </motion.span>
        </Link>
        
        <div className="mobile-menu block md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center px-3 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:opacity-80 transition-opacity"
          >
            {!navbarOpen ? (
              <Bars3Icon className="h-5 w-5" />
            ) : (
              <XMarkIcon className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink href={link.path} title={link.title} />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: navbarOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
