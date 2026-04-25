"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {

  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (!year) return null;

  return (
    <footer className="w-full mt-auto bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800 text-gray-700 dark:text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <h2 className="text-lg font-semibold">
            Teknoesis Task Manager
          </h2>

          <div className="flex gap-6 text-sm">

            <Link
              href="/"
              className="hover:text-blue-500 transition"
            >
              Dashboard
            </Link>

            <Link
              href="/add-task"
              className="hover:text-blue-500 transition"
            >
              Add Task
            </Link>

          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-4 border-t dark:border-gray-800 text-center text-sm">

          © {year} Teknoesis. All rights reserved.

        </div>

      </div>

    </footer>
  );
}