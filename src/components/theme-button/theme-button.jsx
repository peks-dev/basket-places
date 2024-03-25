import React from "react";
import Button from "@/components/button/button";

import { useThemeStore } from "@/context/themeStore";

const ThemeButton = () => {
  const { currentTheme, changeTheme } = useThemeStore();

  return (
    <Button type="button" onClick={changeTheme}>
      theme: {currentTheme}
    </Button>
  );
};

export default ThemeButton;
