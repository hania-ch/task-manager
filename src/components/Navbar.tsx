"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    setMounted(true);

    // Get user from localStorage
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }

  }, []);

  if (!mounted) return null;

  // Logout function
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/login";

  };

  return (

    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-800">

      {/* Logo */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Task Manager
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">

        <Link href="/" className="hover:text-blue-500">
          Dashboard
        </Link>

        <ThemeToggle />

        {/* USER PROFILE */}
        {user ? (

          <div className="flex items-center gap-3">

            <span className="text-sm font-medium">
              👤 {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              Logout
            </button>

          </div>

        ) : (

          <Link
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>

        )}

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

        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 flex flex-col items-center gap-4 py-4 md:hidden shadow-md">

          <Link
            href="/"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <ThemeToggle />

          {/* MOBILE USER */}
          {user ? (

            <>
              <span>
                👤 {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="text-red-500"
              >
                Logout
              </button>
            </>

          ) : (

            <Link
              href="/login"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>

  


          )}

        </div>

      )}

    </nav>

  );
}






// "use client";

// import { useEffect, useState } from "react";
// import ThemeToggle from "./ThemeToggle";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
// const [mounted, setMounted] = useState(false);

// useEffect(() => {
//   setMounted(true);
// }, []);

// if (!mounted) return null;
//   return (
//     <nav className="w-full px-6 py-4 flex items-center justify-between 
//       bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-800">

//       {/* Logo */}
//       <h1 className="text-xl font-bold text-gray-800 dark:text-white">
//         Task Manager
//       </h1>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex items-center gap-6">
//         <a href="/" className="hover:text-blue-500">Dashboard</a>
//         <ThemeToggle />
//       </div>

//       {/* Mobile Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="md:hidden text-gray-800 dark:text-white"
//       >
//         {open ? <X /> : <Menu />}
//       </button>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 
//           flex flex-col items-center gap-4 py-4 md:hidden shadow-md">

//           <a href="/" onClick={() => setOpen(false)}>Dashboard</a>

//           <ThemeToggle />

//         </div>
//       )}
//     </nav>
//   );
// }