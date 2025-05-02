import express from 'express';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js'; // ✅ Add this line
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes); // ✅ Register the route

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/visitAddis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
