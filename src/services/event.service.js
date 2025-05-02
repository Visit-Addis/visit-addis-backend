import { Event } from "../models/index.js";
import { CustomError } from "../utils/index.js";

const postEvent = async (eventData) => {
  const event = await Event.create(eventData);
  if (!event) {
    throw new CustomError(400, "post event failed", true);
  }
  return event;
};

const updateEvent = async (id, eventData) => {
  const event = await Event.findById(id);
  if (!event) {
    throw new CustomError(404, "This event is not found currently", true);
  }
  return "event updated successfully";
};

const deleteEvent = async (id) => {
  const deletedEvent = await Event.findByIdAndDelete(id);
  if (!deletedEvent) {
    throw new CustomError(400, "Event deletion failed", true);
  }
  return "event deleted successfully";
};

const getEvents = async () => {
  const events = await Event.find({}, "id name description date time images");
  return events;
};

const getEventDetail = async (id) => {
  const eventDetail = await Event.findById(id)
    .select("id name description date time images averageRating reviews")
    .populate({ path: images, select: "url" })
    .populate({ path: "reviews", select: "userId,rating comment" });

  if (!eventDetail) {
    throw new CustomError(404, "event detail not found", true);
  }
  return eventDetail;
};

export default {
  postEvent,
  updateEvent,
  deleteEvent,
  getEventDetail,
  getEvents,
};
