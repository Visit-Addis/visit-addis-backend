import express from 'express';
import Event from '../models/Event.js'; // Import the Event model

const router = express.Router();

// POST - CREATE event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).send('Error creating event');
  }
});

// GET - GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name');
    res.json(events);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
