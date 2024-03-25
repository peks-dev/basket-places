import React from "react";
import Button from "@/components/button/button";

import { useThemeStore } from "@/context/themeStore";

const ThemeButton = () => {
  const { currentTheme, changeTheme } = useThemeStore();

  const buttonStyle = currentTheme === "dark" ? "dark" : "light";

  return (
    <Button
      variant={"theme"}
      type="button"
      onClick={changeTheme}
      customStyle={buttonStyle}
    >
      theme: {currentTheme}
    </Button>
  );
};

export default ThemeButton;
