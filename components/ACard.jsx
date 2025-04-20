import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const ACard = ({ prompt, showLikeButton = true }) => {
  const { heading, definition, likeCount, _id, likes = [] } = prompt;
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  useEffect(() => {
    if (user && likes.includes(user.id)) {
      setLiked(true);
    }
  }, [user, likes]);

  const handleLike = async () => {
    if (!user || liked || isLiking) return;
    try {
      setIsLiking(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/prompts/${_id}/like`,
        { userId: user.id }
      );
      setLiked(true);
      setCurrentLikeCount(prev => response?.data?.likeCount ?? prev + 1);
    } catch (error) {
      console.error('Error liking prompt:', error);
      alert(error.response?.data?.message || 'Failed to like prompt');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="card bg-base-100 card-bordered shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1 min-w-[250px] max-w-[400px]">
      <div className="card-body">
        <h2 className="larger-font text-xl font-bold text-primary">{heading}</h2>
        <p className="text-base text-gray-700 line-clamp-3">{definition}</p>
        <div className="card-actions justify-between items-center mt-2">
          <span className="text-sm text-accent">Likes: {currentLikeCount}</span>
          <div>
            {showLikeButton && user && (
              <button
                className={`btn btn-sm ${liked ? 'btn-success' : 'btn-primary'}`}
                onClick={handleLike}
                disabled={liked || isLiking}
                aria-label={liked ? 'Liked' : 'Like'}
              >
                {liked ? 'Liked' : isLiking ? 'Liking...' : 'Like'}
              </button>
            )}
            {/* Placeholder for Delete (to be implemented later) */}
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACard;
