import React, { useState, useEffect } from 'react';
import { fetchGenres } from '../services/api';

const GenreFilter = ({ selectedGenre, onSelectGenre }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        if (isMounted) setGenres(data.results);
      } catch (error) {
        console.error('Failed to load genres', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadGenres();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse flex-shrink-0"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <button
        onClick={() => onSelectGenre(null)}
        className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all snap-start shadow-sm hover:shadow-md ${
          selectedGenre === null
            ? 'bg-blue-600 text-white dark:bg-amber-500 dark:text-gray-900 scale-105'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-[#1f1f1f] dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
      >
        All Games
      </button>
      {genres.map(genre => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all snap-start shadow-sm hover:shadow-md ${
            selectedGenre === genre.id
              ? 'bg-blue-600 text-white dark:bg-amber-500 dark:text-gray-900 scale-105'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-[#1f1f1f] dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
