import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false); // controls visibility
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".lang-toggle")) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 w-full">
      <div className="px-6 py-4 flex flex-wrap items-center justify-between w-full">
        {/* Branding */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-white hover:opacity-80"
        >
          Mohammad Rajabi
        </Link>

        {/* Navigation & Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
          <ul className="flex flex-wrap gap-4 text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">
            <li>
              <Link to="/">{t.home}</Link>
            </li>
            <li>
              <Link to="/about">{t.about}</Link>
            </li>
            <li>
              <Link to="/projects">{t.projects}</Link>
            </li>
            <li>
              <Link to="/contact">{t.contact}</Link>
            </li>
          </ul>

          <a
            href="/mohammad-cv.pdf"
            download
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition text-sm whitespace-nowrap"
          >
            {t.downloadCV}
          </a>

          {/* Light/Dark Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl hover:opacity-80 transition"
            title="Toggle light/dark mode"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {/* Language Switcher */}
          <div className="relative lang-toggle">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
            >
              <img
                src={`/flags/${language}.png`}
                alt={language}
                className="w-5 h-5 object-cover rounded"
              />
              <span className="uppercase text-sm font-medium">{language}</span>
            </button>

            {showLangMenu && (
              <div className="absolute top-full mt-2 w-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow z-10">
                <button
                  onClick={() => {
                    setLanguage("en");
                    setShowLangMenu(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                >
                  <img src="/flags/en.png" alt="EN" className="w-4 h-4" />
                  EN
                </button>
                <button
                  onClick={() => {
                    setLanguage("it");
                    setShowLangMenu(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                >
                  <img src="/flags/it.png" alt="IT" className="w-4 h-4" />
                  IT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
