import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync Wishlist
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync Recently Viewed
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleWishlist = (game) => {
    setWishlist(prev => {
      const isWishlisted = prev.some(item => item.id === game.id);
      if (isWishlisted) {
        toast.success(`Removed ${game.name} from Wishlist`, { icon: '🗑️' });
        return prev.filter(item => item.id !== game.id);
      } else {
        toast.success(`Added ${game.name} to Wishlist`, { icon: '❤️' });
        return [...prev, game];
      }
    });
  };

  const addRecentlyViewed = (game) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== game.id);
      return [game, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        wishlist,
        toggleWishlist,
        recentlyViewed,
        addRecentlyViewed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
