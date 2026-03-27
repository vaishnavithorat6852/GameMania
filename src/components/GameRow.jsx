import React, { useState, useEffect } from 'react';
import { fetchGames } from '../services/api';
import GameCard from './GameCard';
import LoadingSkeleton from './LoadingSkeleton';

const GameRow = ({ title, params }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadGames = async () => {
      try {
        const data = await fetchGames({ ...params, page_size: 15 });
        if (isMounted) setGames(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadGames();
    return () => { isMounted = false; };
  }, [JSON.stringify(params)]);

  if (loading) {
    return (
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">{title}</h2>
        <div className="flex gap-4 overflow-x-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="min-w-[280px] sm:min-w-[320px]"><LoadingSkeleton /></div>
          ))}
        </div>
      </section>
    );
  }

  if (games.length === 0) return null;

  return (
    <section className="mb-10 relative group">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">{title}</h2>
      <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide xl:pr-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {games.map(game => (
          <div key={game.id} className="min-w-[280px] sm:min-w-[320px] snap-start flex-shrink-0">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameRow;
