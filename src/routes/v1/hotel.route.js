import express from "express";
import { restaurantController } from "../../controllers/index.js";

const router = express.Router();

router.get("/", restaurantController.getRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/filter", restaurantController.filterRestaurants);

export default router;
