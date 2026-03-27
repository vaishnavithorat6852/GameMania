import React from 'react';
import { Link } from 'react-router-dom';
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid, FaLinux } from 'react-icons/fa';
import { IoGameControllerOutline } from 'react-icons/io5';
import { BsStarFill } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { useAppContext } from '../context/AppProvider';

// Platform icons mapping
const PlatformIcon = ({ slug }) => {
  switch (slug) {
    case 'pc': return <FaWindows title="PC" />;
    case 'playstation': return <FaPlaystation title="PlayStation" />;
    case 'xbox': return <FaXbox title="Xbox" />;
    case 'ios':
    case 'mac': return <FaApple title="Apple" />;
    case 'android': return <FaAndroid title="Android" />;
    case 'linux': return <FaLinux title="Linux" />;
    case 'nintendo': return <IoGameControllerOutline title="Nintendo" />;
    default: return <span className="text-xs">{slug}</span>;
  }
};

const GameCard = ({ game }) => {
  const { wishlist, toggleWishlist } = useAppContext();
  const isWishlisted = wishlist.some(item => item.id === game.id);

  const getCroppedImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/600x400?text=No+Image';
    const target = 'media/';
    const index = url.indexOf(target);
    if (index === -1) return url;
    const mediaPath = url.slice(index + target.length);
    return url.slice(0, index) + target + 'crop/600/400/' + mediaPath;
  }

  return (
    <div className="bg-white dark:bg-[#1f1f1f] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative group cursor-pointer border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-gray-600 flex flex-col h-full">
      <Link to={`/games/${game.id}`} className="block relative h-48 overflow-hidden">
        <img 
          src={getCroppedImageUrl(game.background_image)} 
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
          <BsStarFill className="text-amber-400 w-3 h-3" />
          {game.rating || 'N/A'}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start mb-1">
          <div className="flex gap-2 text-gray-500 dark:text-gray-400 text-sm flex-wrap">
            {game.parent_platforms?.map(({ platform }) => (
              <PlatformIcon key={platform.id} slug={platform.slug} />
            ))}
          </div>
        </div>
        
        <Link to={`/games/${game.id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-500 dark:hover:text-amber-400 transition-colors">
            {game.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 flex justify-between items-center">
          <div className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300">
            {game.released ? new Date(game.released).getFullYear() : 'TBA'}
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(game);
            }} 
            className={`transition-all active:scale-95 ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FiHeart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
