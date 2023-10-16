"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="flex items-center justify-center mx-4 w-[30px]">
      {theme === "light" ? (
        <BiMoon
          onClick={() => setTheme("dark")}
          size={25}
          className="cursor-pointer text-slate-600 dark:text-slate-400"
        />
      ) : (
        <BiSun
          onClick={() => setTheme("light")}
          size={25}
          className="cursor-pointer text-slate-600 dark:text-slate-400"
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
