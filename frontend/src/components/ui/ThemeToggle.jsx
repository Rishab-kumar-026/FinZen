import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
      {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-800" />}
    </button>
  );
};

export default ThemeToggle;
