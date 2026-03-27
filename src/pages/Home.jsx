import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchGames } from '../services/api';
import { useAppContext } from '../context/AppProvider';
import GameCard from '../components/GameCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import GenreFilter from '../components/GenreFilter';
import GameRow from '../components/GameRow';
import { IoGameControllerOutline } from 'react-icons/io5';

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const { wishlist } = useAppContext();
  
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isGridMode = searchQuery || selectedGenre;

  // Extract most common genre from wishlist for recommendations
  const recommendedGenreId = useMemo(() => {
    if (wishlist.length === 0) return null;
    const genreCounts = {};
    wishlist.forEach(game => {
      game.genres?.forEach(g => {
        genreCounts[g.slug] = (genreCounts[g.slug] || 0) + 1;
      });
    });
    return Object.keys(genreCounts).sort((a,b) => genreCounts[b] - genreCounts[a])[0];
  }, [wishlist]);

  // Reset page when switching searches or filters
  useEffect(() => {
    setPage(1);
    setGames([]);
  }, [searchQuery, selectedGenre]);

  // Handle grid mode data loading
  useEffect(() => {
    if (!isGridMode) return; 

    let isMounted = true;
    const loadGames = async () => {
      setLoading(true);
      try {
        const params = { page, page_size: 20 };
        if (searchQuery) params.search = searchQuery;
        if (selectedGenre) params.genres = selectedGenre;

        const data = await fetchGames(params);
        if (isMounted) {
          setGames(prev => page === 1 ? data.results : [...prev, ...data.results]);
          setHasMore(data.next !== null);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) setLoading(false);
      }
    };
    loadGames();
    return () => { isMounted = false; };
  }, [page, searchQuery, selectedGenre, isGridMode]);

  return (
    <div className="space-y-4 animate-fade-in pb-10">
      {/* Category Pills Header */}
      {!searchQuery && (
        <section className="mt-4 mb-8">
          <GenreFilter selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
        </section>
      )}

      {/* Rows Mode (Netflix style) shown when no active filter/search */}
      {!isGridMode && (
        <div className="mt-8 space-y-12">
          <GameRow title="🔥 Trending Now" params={{ ordering: '-added' }} />
          <GameRow title="⭐ Top Rated of All Time" params={{ ordering: '-rating' }} />
          <GameRow title="🆕 New & Upcoming" params={{ dates: '2023-01-01,2024-12-31', ordering: '-released' }} />
          
          {recommendedGenreId && (
            <GameRow 
              title="🎯 Recommended For You" 
              params={{ genres: recommendedGenreId, ordering: '-rating' }} 
            />
          )}
        </div>
      )}

      {/* Grid Mode shown when searching or filtering by genre */}
      {isGridMode && (
        <div className="mt-8">
          {searchQuery && (
            <h2 className="text-2xl font-bold mb-6">
              Search Results for: <span className="text-blue-600 dark:text-amber-400">{searchQuery}</span>
            </h2>
          )}
          {!searchQuery && selectedGenre && (
            <h2 className="text-2xl font-bold mb-6">
              Category Results
            </h2>
          )}

          {games.length === 0 && !loading && (
            <div className="text-center py-20 bg-white dark:bg-[#1f1f1f] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <IoGameControllerOutline className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">No games found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {games.map((game, index) => (
              <GameCard key={`${game.id}-${index}`} game={game} />
            ))}
            {loading && [...Array(8)].map((_, i) => <LoadingSkeleton key={i} />)}
          </div>

          {hasMore && !loading && games.length > 0 && (
            <div className="flex justify-center mt-12 pb-8">
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-8 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 flex items-center gap-2"
              >
                Load More Games
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
