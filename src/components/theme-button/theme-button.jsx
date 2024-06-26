import React from "react";

// Components
import Button from "@/components/button/button";
import LightIcon from "@/components/icons/light-icon";
// Context
import { useThemeStore } from "@/context/themeStore";

const ThemeButton = () => {
  const { currentTheme, changeTheme, applyTheme } = useThemeStore();

  function handleChangeTheme() {
    changeTheme();
    applyTheme();
  }

  return (
    <Button
      variant={"map-control"}
      type="button"
      onClick={handleChangeTheme}
      customStyle={currentTheme === "light" ? "active" : "inactive"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </Button>
  );
};

export default ThemeButton;
