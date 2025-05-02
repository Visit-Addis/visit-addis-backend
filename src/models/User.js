import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  // Add other necessary fields for your Event model
});

const Event = mongoose.model('Event', eventSchema);

export default Event; // Ensure you're exporting the model with `export default`
