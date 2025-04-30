import { Attraction } from "../models/index.js";
import { CustomError } from "../utils/index.js";

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

export default { getAttractions, getAttractionDetails, searchAttraction };
