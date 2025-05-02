import mongoose from 'mongoose';

// Define the schema for the Event model
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming organizer is a User
});

// Check if the model is already registered, otherwise register it
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
