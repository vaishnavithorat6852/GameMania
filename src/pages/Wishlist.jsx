import React from 'react';
import { useAppContext } from '../context/AppProvider';
import GameCard from '../components/GameCard';
import { FiHeart } from 'react-icons/fi';
import { IoGameControllerOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, recentlyViewed } = useAppContext();

  return (
    <div className="space-y-12 pb-10 animate-fade-in max-w-[1400px] mx-auto">
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-100 dark:bg-red-500/10 rounded-2xl">
            <FiHeart className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Your <span className="text-blue-600 dark:text-amber-400">Wishlist</span>
          </h1>
        </div>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-[#1a1a1a] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl max-w-3xl mx-auto">
            <div className="mx-auto w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <FiHeart className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Your wishlist is empty</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">Start exploring and save games you want to play later by clicking the heart icon on any game.</p>
            <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-gray-900 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg">
              <IoGameControllerOutline className="text-xl" />
              Discover Games
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {wishlist.map((game) => (
              <GameCard key={`wishlist-${game.id}`} game={game} />
            ))}
          </div>
        )}
      </section>

      {recentlyViewed.length > 0 && (
        <section className="pt-12 mt-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold mb-8 tracking-tight">Recently Viewed</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide xl:pr-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {recentlyViewed.map(game => (
              <div key={`recent-${game.id}`} className="min-w-[280px] sm:min-w-[320px] snap-start flex-shrink-0">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Wishlist;
