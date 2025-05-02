import express from "express";
import auhRoute from "./auth.route.js";
import profileRoute from "./profile.route.js";
import reviewRoute from "./review.route.js";
import restuarantRoute from "./restuarant.route.js";
import eventRoute from "./event.route.js";
import atrractionRoute from "./attraction.route.js";

const Router = express.Router();
const routes = [
  {
    path: "/auth",
    route: auhRoute,
  },
  {
    path: "/profile",
    route: profileRoute,
  },
  {
    path: "/event",
    route: eventRoute,
  },
  {
    path: "/attraction",
    route: atrractionRoute,
  },
  {
    path: "/restuarant",
    route: restuarantRoute,
  },
  {
    path: "/review",
    route: reviewRoute,
  },
];
routes.forEach((route) => {
  Router.use(route.path, route.route);
});

routes.use('/profile', profileRoutes);

export default Router;
