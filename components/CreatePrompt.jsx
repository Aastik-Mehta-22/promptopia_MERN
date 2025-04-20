import { useState } from 'react';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePrompt() {
  const [heading, setHeading] = useState('');
  const [definition, setDefinition] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading.trim() || !definition.trim()) {
      setError('Heading and definition are required');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/prompts`, {
        heading: heading.trim(),
        definition: definition.trim(),
        userId: user.id,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/explore');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create prompt');
      console.error('Error creating prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in to continue</h2>
        <p className="text-gray-600">You need to be signed in to create prompts.</p>
      </div>
    );
  }

  return (
    <SignedIn>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Create a New Prompt</h2>
        <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
          <div className="card-body">
            {success && (
              <div className="alert alert-success shadow-lg mb-4">
                <span>Prompt created successfully! Redirecting...</span>
              </div>
            )}
            {error && (
              <div className="alert alert-error shadow-lg mb-4">
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Heading</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter prompt heading"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  className="input input-bordered w-full"
                  maxLength={100}
                  disabled={loading}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Definition</span>
                </label>
                <textarea
                  placeholder="Enter prompt definition"
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  className="textarea textarea-bordered w-full h-32"
                  maxLength={500}
                  disabled={loading}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    'Create Prompt'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SignedIn>
  );
}

export default CreatePrompt;