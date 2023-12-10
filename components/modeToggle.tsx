"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (theme === null) {
    setTheme("light");
  }

  return (
    <Button variant="default" size="icon" onClick={toggleTheme}>
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ${theme === "light" ? "rotate-0 scale-100" : ""}`} />
      <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${theme === "dark" ? "rotate-90 scale-0" : ""}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}