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

  if (data.images) {
    event.images.push(data.images);
    delete data.images;
  }
  Object.keys(eventData).forEach((key) => {
    event[key] = eventData[key];
  });
  await event.save();
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
  const events = await Event.find(
    {},
    "id name description date time images"
  ).populate({ path: "images", select: "url" });
  return events;
};

const getEventDetail = async (id) => {
  const eventDetail = await Event.findById(id)
    .select(
      "id name description date time images averageRating reviews ticketPrice"
    )
    .populate({ path: "images", select: "url" })
    .populate({ path: "reviews", select: "userId rating comment" });

  if (!eventDetail) {
    throw new CustomError(404, "event detail not found", true);
  }
  return eventDetail;
};

const searchEvents = async (filters) => {
  const query = {};
  const textSearchConditions = [];
  if (filters.averageRating) {
    query.averageRating = { $gte: parseFloat(filters.averageRating) };
    delete filters.averageRating;
  }
  for (const key in filters) {
    textSearchConditions.push({
      [key]: { $regex: filters[key], $options: "i" },
    });
  }
  if (textSearchConditions.length > 0) {
    query.$or = textSearchConditions;
  }
  const events = await Event.find(query, "id name location");
  return events;
};

export default {
  postEvent,
  updateEvent,
  deleteEvent,
  getEventDetail,
  getEvents,
  searchEvents,
};
