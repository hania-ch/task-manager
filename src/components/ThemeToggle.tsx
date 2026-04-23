"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}


// "use client";

// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const { resolvedTheme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;

//   return (
//     <button
//       onClick={() =>
//         setTheme(resolvedTheme === "dark" ? "light" : "dark")
//       }
//       className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
//     >
//       {resolvedTheme === "dark" ? "🌞 Light" : "🌙 Dark"}
//     </button>
//   );
// }