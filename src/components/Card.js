import React from 'react';

const Card = ({ post, removePost }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="font-bold text-lg">{post.title}</h3>
        <p>{post.body}</p>
        <p className="text-gray-500 text-sm">{new Date(post.id).toUTCString()}</p>
      </div>
      <button 
        onClick={() => removePost(post.id)} 
        className="bg-red-500 text-white p-2 rounded-full"
      >
        &times;
      </button>
    </div>
  );
};

export default Card;
