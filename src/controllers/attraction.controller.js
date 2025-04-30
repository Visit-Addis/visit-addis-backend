import { attractionService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

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

export default { getAttractions, getAttractionDetail, searchAttractions };
