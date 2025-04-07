import React from "react";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <div className="bg-bg-input shadow">
      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-text-primary font-extrabold">
            Where in the world?
          </p>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
