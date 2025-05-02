import Event from '../models/Event.model.js';
import mongoose from 'mongoose';

// Add this function
export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({}).lean();
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    next(error);
  }
};

export const getEventDetails = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid event ID format'
      });
    }

    const event = await Event.findById(req.params.id).lean();

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: event
    });

  } catch (error) {
    next(error);
  }
};