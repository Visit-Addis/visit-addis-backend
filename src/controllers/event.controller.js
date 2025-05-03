import { eventService, reviewService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";
import { updloadAndSaveImge } from "./util.js";

const postEvent = handleCatchError(async (req, res) => {
  const eventData = await updloadAndSaveImge(req, "events");
  const events = await eventService.postEvent(eventData);
  res.status(201).json(events);
});

const updateEvent = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const eventData = await updloadAndSaveImge(req, "events");
  const message = await eventService.updateEvent(id, eventData);
  res.status(202).json(message);
});

const deleteEvent = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const message = await eventService.deleteEvent(id);
  res.status(200).json(message);
});

const getEvents = handleCatchError(async (req, res) => {
  const events = await eventService.getEvents();
  res.status(200).json(events);
});

const getRestaurantDetails = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const eventDetail = await eventService.getEventDetail(id);
  res.status(200).json(eventDetail);
});

const postReview = handleCatchError(async (req, res) => {
  req.body.category = "event";
  req.body.userId = req.user.id;
  const message = await reviewService.postReview(req.body);
  res.status(200).json(message);
});

const searchEvents = handleCatchError(async (req, res) => {
  const query = req.query;
  const events = await eventService.searchEvents(query);
  res.status(200).json(events);
});

export default {
  postEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getRestaurantDetails,
  postReview,
  searchEvents,
};
