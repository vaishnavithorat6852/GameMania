import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiMoon, FiSun, FiHeart } from 'react-icons/fi';
import { IoGameControllerOutline } from 'react-icons/io5';
import { useAppContext } from '../context/AppProvider';
import { useDebounce } from '../hooks/useDebounce';

const Navbar = () => {
  const { theme, toggleTheme, wishlist } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If we're on the home page and have a search term, update the URL
    if (debouncedSearch && location.pathname === '/') {
      navigate(`/?search=${encodeURIComponent(debouncedSearch)}`);
    } else if (!debouncedSearch && location.pathname === '/' && location.search.includes('search')) {
      navigate('/');
    }
  }, [debouncedSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-[#141414]/90 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0" onClick={() => setSearchTerm('')}>
          <IoGameControllerOutline className="w-8 h-8 text-blue-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-extrabold tracking-tight hidden sm:block text-gray-900 dark:text-white">
            Game<span className="text-blue-600 dark:text-amber-400">Mania</span>
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl px-2 sm:px-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-amber-400 transition-colors">
              <FiSearch />
            </div>
            <input
              type="text"
              className="w-full bg-gray-100 dark:bg-[#202020] border-transparent focus:border-blue-500 dark:focus:border-amber-400 focus:bg-white dark:focus:bg-[#141414] focus:ring-2 focus:ring-blue-200 dark:focus:ring-amber-500/20 text-gray-900 dark:text-gray-100 text-sm rounded-full pl-10 pr-4 py-2 transition-all duration-300 outline-none placeholder-gray-500"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link
            to="/wishlist"
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
            title="Wishlist"
          >
            <FiHeart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-[#141414]"></span>
              </span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <FiSun className="w-5 h-5 hover:text-amber-400 transition-colors" /> : <FiMoon className="w-5 h-5 hover:text-blue-500 transition-colors" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
