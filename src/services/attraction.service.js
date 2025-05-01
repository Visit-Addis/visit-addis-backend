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
  );
  if (!attractions) {
    throw new CustomError(400, "No attraction found", true);
  }
  return attractions;
};

const getAttractionDetails = async (id) => {
  const attractionDetail = await Attraction.findById(id);
  if (!attractionDetail) {
    throw new CustomError(400, "No attraction details found", true);
  }
  return attractionDetail;
};

const searchAttraction = async (searchItemes) => {
  let query = {};
  if (searchItemes.averageRating) {
    query.averageRating = { $gte: parseFloat(searchItemes.averageRating) };
    delete searchItemes.searchItemes;
  }

  if (searchItemes.ticketPrice) {
    query.ticketPrice = { $lte: searchItemes.ticketPrice };
    delete searchItemes.ticketPrice;
  }

  query.Object.keys(searchItemes).forEach((key) => {
    query[key] = { $regex: key, $options: "i" };
  });

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
