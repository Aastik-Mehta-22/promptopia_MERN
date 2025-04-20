import { useState, useEffect } from 'react';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import axios from 'axios';
import ACard from './ACard.jsx';

function Explore() {
  const [prompts, setPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    async function fetchPrompts() {
      setLoading(true);
      try {
        const url = searchQuery
          ? `${import.meta.env.VITE_API_URL}/api/prompts/search?query=${encodeURIComponent(searchQuery)}`
          : `${import.meta.env.VITE_API_URL}/api/prompts`;
        const response = await axios.get(url);
        setPrompts(response.data);
      } catch (error) {
        setError('Failed to load prompts');
        console.error('Error fetching prompts:', error);
      } finally {
        setLoading(false);
      }
    }
    if (isSignedIn) {
      fetchPrompts();
    }
  }, [searchQuery, isSignedIn]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (!isSignedIn) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in to continue</h2>
        <p className="text-gray-600">You need to be signed in to explore prompts.</p>
      </div>
    );
  }

  return (
    <SignedIn>
      <div className="container mx-auto p-6">
        <h2 className="text-5xl font-bold text-center mb-6 text-primary " style={{fontSize: 20}} >Explore Prompts</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={handleSearch}
            className="input input-bordered w-full max-w-md mx-auto block"
          />
        </div>
        {error && <div className="alert alert-error shadow-lg mb-4">{error}</div>}
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner"></span>
          </div>
        ) : prompts.length === 0 ? (
          <p className="text-center text-gray-500">No prompts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((prompt) => (
              <ACard key={prompt._id} prompt={prompt} showLikeButton={true} />
            ))}
          </div>
        )}
      </div>
    </SignedIn>
  );
}

export default Explore;