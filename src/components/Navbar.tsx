"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between 
      bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-800">

      {/* Logo */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Task Manager
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <a href="/" className="hover:text-blue-500">Dashboard</a>
        <ThemeToggle />
      </div>

      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-gray-800 dark:text-white"
      >
        {open ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 
          flex flex-col items-center gap-4 py-4 md:hidden shadow-md">

          <a href="/" onClick={() => setOpen(false)}>Dashboard</a>

          <ThemeToggle />

        </div>
      )}
    </nav>
  );
}