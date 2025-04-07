import { IoMoon, IoMoonOutline } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="p-2">
      {darkMode ? (
        <button
          className="flex cursor-pointer items-center"
          onClick={() => setDarkMode((prevTheme) => !prevTheme)}
        >
          <IoMoon className="text-text-primary mr-2 text-lg" /> Dark Mode
        </button>
      ) : (
        <button
          className="flex cursor-pointer items-center"
          onClick={() => setDarkMode((prevTheme) => !prevTheme)}
        >
          <IoMoonOutline className="text-text-primary mr-2 text-lg" /> Dark Mode
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;
