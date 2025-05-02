import { Router } from 'express';
import { 
  getEvents,
  getEventDetails 
} from '../../controllers/event.controller.js'; // Named imports matching exports

const router = Router();

// API Endpoints
router.get('/', getEvents);          // GET /api/v1/events
router.get('/:id', getEventDetails); // GET /api/v1/events/:id

export default router;