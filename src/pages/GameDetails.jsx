import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGameDetails, fetchGameScreenshots, fetchGameTrailers } from '../services/api';
import { useAppContext } from '../context/AppProvider';
import GameRow from '../components/GameRow';
import { BsStarFill, BsCalendar3 } from 'react-icons/bs';
import { FiExternalLink, FiHeart } from 'react-icons/fi';

const GameDetails = () => {
  const { id } = useParams();
  const { wishlist, toggleWishlist, addRecentlyViewed } = useAppContext();
  
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  const isWishlisted = game && wishlist.some(item => item.id === game.id);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);

    const loadData = async () => {
      setLoading(true);
      try {
        const [details, screens, movies] = await Promise.all([
          fetchGameDetails(id),
          fetchGameScreenshots(id),
          fetchGameTrailers(id).catch(() => ({ results: [] }))
        ]);

        if (isMounted) {
          setGame(details);
          setScreenshots(screens.results);
          setTrailers(movies.results);
          addRecentlyViewed({
            id: details.id,
            name: details.name,
            background_image: details.background_image,
            rating: details.rating,
            released: details.released,
            parent_platforms: details.parent_platforms
          });
        }
      } catch (error) {
        console.error("Failed to fetch game details", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-8 min-h-screen">
        <div className="h-[400px] sm:h-[500px] bg-gray-200 dark:bg-[#1a1a1a] rounded-3xl w-full"></div>
        <div className="h-10 w-1/3 bg-gray-200 dark:bg-[#1a1a1a] rounded-lg"></div>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 dark:bg-[#1a1a1a] rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-[#1a1a1a] rounded"></div>
        </div>
      </div>
    );
  }

  if (!game) return <div className="text-center py-20 text-2xl font-bold">Game not found</div>;

  return (
    <div className="space-y-12 pb-10 animate-fade-in relative max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <div 
        className="relative h-[50vh] min-h-[400px] lg:min-h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group border border-gray-200 dark:border-gray-800"
      >
        <img 
          src={game.background_image || 'https://via.placeholder.com/1920x1080?text=No+Image'} 
          alt={game.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>
        
        <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full lg:w-3/4">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-amber-500 text-black text-sm font-bold rounded-lg flex items-center gap-2 shadow-lg">
              <BsStarFill /> {game.rating || 'N/A'}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-lg ring-1 ring-white/30">
              <BsCalendar3 /> {game.released ? new Date(game.released).toLocaleDateString() : 'TBA'}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
            {game.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {game.genres?.map(g => (
              <span key={g.id} className="px-4 py-1.5 border border-white/30 text-white rounded-full text-sm font-medium backdrop-blur-md bg-black/40 hover:bg-black/60 transition-colors">
                {g.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => toggleWishlist(game)}
              className={`px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-xl ${
                isWishlisted 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
              }`}
            >
              <FiHeart className={`${isWishlisted ? 'fill-white' : ''} text-xl`} />
              {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
            
            {game.website && (
              <a 
                href={game.website} 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95 shadow-xl ring-1 ring-blue-500/50"
              >
                Website <FiExternalLink className="text-xl" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col - Details */}
        <div className="lg:col-span-8 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">About</h2>
            <div 
              className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: game.description || 'No description available.' }}
            ></div>
          </section>

          {/* Trailers */}
          {trailers.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Trailers</h2>
              <div className="grid grid-cols-1 gap-6">
                {trailers.map(trailer => (
                  <video 
                    key={trailer.id} 
                    controls 
                    poster={trailer.preview}
                    className="w-full rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
                  >
                    <source src={trailer.data.max} type="video/mp4" />
                  </video>
                ))}
              </div>
            </section>
          )}

          {/* Screenshots */}
          {screenshots.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {screenshots.map(img => (
                  <div key={img.id} className="overflow-hidden rounded-2xl shadow-md border border-gray-200 dark:border-gray-800">
                    <img 
                      src={img.image} 
                      alt="Gameplay screenshot" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Col - Meta info */}
        <div className="lg:col-span-4">
          <div className="space-y-8 bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl sticky top-24">
            <h3 className="text-2xl font-bold mb-2 border-b border-gray-200 dark:border-gray-700 pb-4">Information</h3>
            
            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2">Platforms</span>
              <div className="flex flex-wrap gap-2">
                {game.platforms?.map(p => (
                  <span key={p.platform.id} className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 font-medium">
                    {p.platform.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2">Developers</span>
              <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {game.developers?.map(d => d.name).join(', ') || 'N/A'}
              </p>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2">Publishers</span>
              <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {game.publishers?.map(p => p.name).join(', ') || 'N/A'}
              </p>
            </div>

            {(game.esrb_rating || game.metacritic) && (
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                {game.metacritic && (
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2">Metascore</span>
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg shadow-sm ${
                      game.metacritic >= 75 ? 'bg-green-100 text-green-700 border border-green-200' :
                      game.metacritic >= 50 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                      'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {game.metacritic}
                    </span>
                  </div>
                )}
                {game.esrb_rating && (
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2">ESRB</span>
                    <p className="font-bold text-lg">{game.esrb_rating.name}</p>
                  </div>
                )}
              </div>
            )}

            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2 pt-4 border-t border-gray-200 dark:border-gray-700">Tags</span>
              <div className="flex flex-wrap gap-2">
                {game.tags?.filter(t => t.language === 'eng').slice(0, 8).map(t => (
                  <span key={t.id} className="text-xs bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations based on genres */}
      {game.genres?.length > 0 && (
        <div className="pt-12 border-t border-gray-200 dark:border-gray-800">
          <GameRow 
            title={`More ${game.genres[0].name} Games You Might Like`} 
            params={{ genres: game.genres.map(g => g.slug).join(','), exclude: game.id, ordering: '-rating' }} 
          />
        </div>
      )}
    </div>
  );
};

export default GameDetails;
