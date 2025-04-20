import React from 'react';


const Card = ({ prompt }) => {
  const { heading, definition, likeCount } = prompt;

  return (
    <div className="card bg-base-50 card-bordered shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1 min-w-[100px] max-w-[100px] border-secondary ">
      <div className="card-body">
        <h2 className="larger-font text-xl font-bold text-primary">{heading}</h2>
        <p className="text-base text-blue-700 line-clamp-3">{definition}</p>
        <div className="card-actions justify-between items-center mt-2">
          <span className="text-sm text-accent">Likes: {likeCount}</span>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;