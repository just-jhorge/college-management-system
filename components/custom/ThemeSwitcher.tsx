"use client";

import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-center">
        <button
          onClick={() => setTheme("light")}
          className="w-full h-[3rem] border border-border rounded-l-2xl rounded-tr-2xl relative bg-neutral-400"
        >
          <div className="bg-white h-[2.2rem] flex items-center justify-center text-black font-semibold w-[70%] absolute bottom-0 right-0 rounded-l-xl rounded-tr-xl">
            Aa
          </div>
        </button>
        <p className="text-[10px]">LIGHT</p>
      </div>
      <div className="text-center">
        <button
          onClick={() => setTheme("dark")}
          className="w-full h-[3rem] border border-border rounded-l-2xl rounded-tr-2xl relative bg-neutral-700 dark:bg-neutral-800"
        >
          <div className="bg-neutral-950 h-[2.2rem] flex items-center justify-center text-white font-semibold w-[70%] absolute bottom-0 right-0 rounded-l-xl rounded-tr-xl">
            Aa
          </div>
        </button>
        <p className="text-[10px]">DARK</p>
      </div>
      <div className="text-center">
        <button
          onClick={() => setTheme("system")}
          className="w-full h-[3rem] flex items-center border border-border rounded-2xl bg-neutral-800"
        >
          <div className="bg-neutral-950 h-[2.2rem] flex items-center justify-center text-white font-semibold w-[70%] rounded-l-xl rounded-tr-xl">
            Aa
          </div>
          <div className="bg-white h-[2.2rem] flex items-center justify-center text-black font-semibold w-[70%] rounded-l-xl rounded-tr-xl">
            Aa
          </div>
        </button>
        <p className="text-[10px]">SYSTEM</p>
      </div>
    </div>
  );
}
