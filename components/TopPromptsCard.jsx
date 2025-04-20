

import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

function TopPromptsCard() {
  const [prompts, setPrompts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTopPrompts() {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/prompts/top`);
        setPrompts(response.data.slice(0, 5));
      } catch (error) {
        setError('Failed to load prompts');
        console.error('Error fetching prompts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTopPrompts();
  }, []);

  if (error) {
    return <div className="alert alert-error shadow-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-5xl font-bold text-center mb-6 text-primary " style={{fontSize: 20}} >Well Liked Prompts ❤️</h2>
   
      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      ) : prompts.length === 0 ? (
        <p className="text-center text-gray-500">No top prompts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {prompts.map((prompt) => (
            <Card key={prompt._id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TopPromptsCard;