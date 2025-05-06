import express from "express";
import auhRoute from "./auth.route.js";
import profileRoute from "./profile.route.js";
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
    path: "/restaurant",
    route: restuarantRoute,
  },
];
routes.forEach((route) => {
  Router.use(route.path, route.route);
});

export default Router;
