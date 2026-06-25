"use client";

import { useTheme } from "next-themes";
import { Separator } from "../ui/separator";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-center space-y-1">
        <button
          onClick={() => setTheme("light")}
          className="w-full h-12 border border-border rounded-l-2xl rounded-tr-2xl relative bg-neutral-200"
        >
          <div className="bg-white h-[2.2rem] flex items-center justify-center text-black font-semibold w-[70%] absolute bottom-0 right-0 rounded-l-xl rounded-tr-xl">
            Aa
          </div>
        </button>
        <p className="text-[10px]">LIGHT</p>
      </div>
      <div className="text-center space-y-1">
        <button
          onClick={() => setTheme("dark")}
          className="w-full h-12 border border-border rounded-l-2xl rounded-tr-2xl relative bg-neutral-700 dark:bg-neutral-800"
        >
          <div className="bg-neutral-950 h-[2.2rem] flex items-center justify-center text-white font-semibold w-[70%] absolute bottom-0 right-0 rounded-l-xl rounded-tr-xl">
            Aa
          </div>
        </button>
        <p className="text-[10px]">DARK</p>
      </div>
      <div className="text-center space-y-1">
        <button
          onClick={() => setTheme("system")}
          className="w-full h-12 flex overflow-hidden items-center border border-border rounded-l-2xl rounded-tr-2xl"
        >
          <div className="flex h-full w-full">
            <div className="w-full h-full relative bg-neutral-200">
              <div className="absolute flex items-center justify-center h-[1.7rem] p-1 bottom-0 left-0 rounded-lg bg-white">
                Aa
              </div>
            </div>
            <div className="w-full h-full relative bg-neutral-700 dark:bg-neutral-800">
              <div className="absolute text-white flex items-center justify-center h-[1.7rem] p-1 bottom-0 right-0 rounded-l-xl rounded-tr-xl bg-neutral-950">
                Aa
              </div>
            </div>
          </div>
        </button>
        <p className="text-[10px]">SYSTEM</p>
      </div>
    </div>
  );
}
