import User from '../models/user.model.js'; // ✅ Fixed: Capitalized
import asyncHandler from 'express-async-handler';
import CustomError from '../utils/custom.error.js';

// @desc    Get user profile
// @route   GET /api/v1/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'favorites.attractions',
      select: '_id name'
    })
    .populate({
      path: 'favorites.restaurants',
      select: '_id name'
    })
    .lean();

  if (!user) {
    throw new CustomError(404, 'User not found');
  }

  const response = {
    id: user._id,
    username: user.username,
    email: user.email,
    favorites: {
      attractions: user.favorites.attractions.map(att => ({
        id: att._id,
        name: att.name
      })),
      restaurants: user.favorites.restaurants.map(res => ({
        id: res._id,
        name: res.name
      })),
      events: user.favorites.events.map(evt => ({
        id: evt // assuming it's just a string ID
      }))
    }
  };

  res.status(200).json(response);
});

// @desc    Update user profile
// @route   PUT /api/v1/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { username } = req.body;

  const updates = {};
  if (username) updates.username = username;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    { new: true, runValidators: true }
  ).select('-password -__v').lean();

  if (!user) {
    throw new CustomError(404, 'User not found');
  }

  const response = {
    id: user._id,
    username: user.username,
    email: user.email,
    joinedDate: user.createdAt.toISOString().split('T')[0]
  };

  res.status(200).json(response);
});

export { getProfile, updateProfile };
