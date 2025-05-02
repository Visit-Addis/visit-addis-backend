import { attractionService, reviewService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

const postAttraction = handleCatchError(async (req, res) => {
  const attraction = await attractionService.postAttraction(req.body);
  res.status(201).json(attraction);
});

const updateAttraction = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const message = await attractionService.updateAttraction(id, req.body);
  res.status(200).json(message);
});

const deleteAttraction = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const message = await attractionService.deleteAttraction(id);
  res.status(200).json(message);
});

const getAttractions = handleCatchError(async (req, res) => {
  const attractions = await attractionService.getAttractions();
  res.status(200).json(attractions);
});

const getAttractionDetail = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const attractionDetail = await attractionService.getAttractionDetails(id);
  res.status(200).json(attractionDetail);
});

const searchAttractions = async (req, res) => {
  const query = req.query;
  const attractions = await attractionService.searchAttraction(query);
  res.status(200).json(attractions);
};

const postReview = handleCatchError(async (req, res) => {
  (req.body.category = "attraction"), (req.body.userId = req.user.id);
  const review = await reviewService.postReview(req.body);
  res.status(201).json(review);
});

export default {
  getAttractions,
  getAttractionDetail,
  searchAttractions,
  postAttraction,
  updateAttraction,
  deleteAttraction,
  postReview,
};
