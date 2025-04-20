
import express from 'express';
import Prompt from '../models/Prompt.js';
import Like from '../models/Like.js';

const router = express.Router();

// Create a prompt
router.post('/', async (req, res) => {
  const { heading, definition, userId } = req.body;

    // console.log(`POST /api/prompts received: ${JSON.stringify(req.body)}`); // debugging the request
  
  if (!heading || !definition || !userId) {
    return res.status(400).json({ message: 'Heading, definition, and userId are required' });
  }

  try {
    const prompt = new Prompt({ heading, definition, createdBy: userId });
    await prompt.save();
    res.status(201).json(prompt);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create prompt' });
  }
});



// Get all prompts
router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ createdAt: -1 });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search prompts
router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const prompts = await Prompt.find({
      $or: [
        { heading: { $regex: query, $options: 'i' } },
        { definition: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like a prompt
router.post('/:id/like', async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    const existingLike = await Like.findOne({ userId, prompt: id });
    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this prompt' });
    }
    const like = new Like({ userId, prompt: id });
    await like.save();
    prompt.likeCount += 1;
    await prompt.save();
    res.json({ message: 'Prompt liked', likeCount: prompt.likeCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get top 5 most liked prompts
router.get('/top', async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ likeCount: -1, createdAt: -1 }).limit(5);
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get prompts liked by a user
router.get('/liked', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const likes = await Like.find({ userId }).select('prompt');
    const promptIds = likes.map(like => like.prompt);
    const prompts = await Prompt.find({ _id: { $in: promptIds } }).sort({ createdAt: -1 });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;