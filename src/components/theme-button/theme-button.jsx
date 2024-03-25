import React from "react";
import Button from "@/components/button/button";

import { useThemeStore } from "@/context/themeStore";

const ThemeButton = () => {
  const { currentTheme, changeTheme, applyTheme } = useThemeStore();

  function handleChangeTheme() {
    changeTheme();
    applyTheme();
  }

  return (
    <Button variant={"theme"} type="button" onClick={handleChangeTheme}>
      modo actual: {currentTheme}
    </Button>
  );
};

export default ThemeButton;
