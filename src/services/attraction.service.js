import { Attraction } from "../models/index.js";
import { CustomError } from "../utils/index.js";

const postAttraction = async (data) => {
  const attraction = await Attraction.create(data);
  if (!attraction) {
    throw new CustomError(400, "attraction post failed", true);
  }
  return attraction;
};

const deleteAttraction = async (id) => {
  const deletedAttraction = await Attraction.findByIdAndDelete(id);
  if (!deleteAttraction) {
    throw new CustomError(400, "Attraction deletion failed", true);
  }
  return "attraction deleted successfully";
};
const updateAttraction = async (id, data) => {
  const attraction = await Attraction.findById(id);
  if (!attraction) {
    throw new CustomError(400, "NO attraction found with this id", true);
  }
  if (data.images) {
    attraction.images.push(data.images);
    delete data.images;
  }
  Object.keys(data).forEach((key) => {
    attraction[key] = data[key];
  });
  const savedAttraction = await attraction.save();
  if (!savedAttraction) {
    throw new CustomError(400, "unable to update attraction", true);
  }
  return "attraction update successfully";
};

const getAttractions = async () => {
  const attractions = await Attraction.find(
    {},
    "id name description images ticketPrice location category"
  ).populate({ path: "images", select: "url" });
  if (!attractions) {
    throw new CustomError(400, "No attraction found", true);
  }
  return attractions;
};

const getAttractionDetails = async (id) => {
  const attractionDetail = await Attraction.findById(id)
    .select(
      "id name description images ticketPrice location category averageRating"
    )
    .populate({ path: "images", select: "url" })
    .populate({ path: "reviews", select: "userId rating comment" });
  if (!attractionDetail) {
    throw new CustomError(400, "No attraction details found", true);
  }
  return attractionDetail;
};

const searchAttraction = async (searchItemes) => {
  let query = {};
  const textSearchConditions = [];
  if (searchItemes.averageRating) {
    query.averageRating = { $gte: parseFloat(searchItemes.averageRating) };
    delete searchItemes.averageRating;
  }

  if (searchItemes.minTicketPrice) {
    query.ticketPrice = {
      ...query.ticketPrice,
      $gte: parseFloat(searchItemes.minTicketPrice),
    };
    delete searchItemes.minTicketPrice;
  }

  if (searchItemes.maxTicketPrice) {
    query.ticketPrice = {
      ...query.ticketPrice,
      $lte: parseFloat(searchItemes.maxTicketPrice),
    };
    delete searchItemes.maxTicketPrice;
  }
  for (const key in searchItemes) {
    textSearchConditions.push({
      [key]: { $regex: searchItemes[key], $options: "i" },
    });
  }

  if (textSearchConditions.length > 0) {
    query.$or = textSearchConditions;
  }

  const attractions = await Attraction.find(query, "id name description");
  return attractions;
};

export default {
  getAttractions,
  getAttractionDetails,
  searchAttraction,
  postAttraction,
  deleteAttraction,
  updateAttraction,
};
