import { useState, useEffect } from 'react';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import axios from 'axios';
import Card from './Card.jsx';

function Liked() {
  const [prompts, setPrompts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    async function fetchLikedPrompts() {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/prompts/liked`, {
          params: { userId: user.id },
        });
        setPrompts(response.data);
      } catch (error) {
        setError('Failed to load liked prompts');
        console.error('Error fetching liked prompts:', error);
      } finally {
        setLoading(false);
      }
    }
    if (isSignedIn && user) {
      fetchLikedPrompts();
    }
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in to continue</h2>
        <p className="text-gray-600">You need to be signed in to view your liked prompts.</p>
      </div>
    );
  }

  return (
    <SignedIn>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Your Liked Prompts</h2>
        {error && <div className="alert alert-error shadow-lg mb-4">{error}</div>}
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner"></span>
          </div>
        ) : prompts.length === 0 ? (
          <p className="text-center text-gray-500">No liked prompts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((prompt) => (
              <Card key={prompt._id} prompt={prompt}  />
            ))}
          </div>
        )}
      </div>
    </SignedIn>
  );
}

export default Liked;