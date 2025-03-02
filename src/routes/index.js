const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const DishesRouter = require("./adminDishes.routes");
const dishesCustomerRoutes = require("./customerDishes.routes");
const tagsRouter = require("./tags.routes");

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/dishes",DishesRouter)
routes.use("/dishescustomer",dishesCustomerRoutes)
routes.use("/tags",tagsRouter)

module.exports = routes;