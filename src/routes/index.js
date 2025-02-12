const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");

const customersMenuRouter = require("./customersMenu.routes");
const customersDishRouter = require("./customersDish.routes");

const adminMenuRouter = require("./adminMenu.routes");
const adminDishRouter = require("./adminDish.routes");
const addRouter = require("./add.routes");
const updateRouter = require("./update.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

routes.use("/customersmenu", customersMenuRouter);
routes.use("/customersdish", customersDishRouter);

routes.use("/adminmenu", adminMenuRouter);
routes.use("/admindish", adminDishRouter);
routes.use("/add", addRouter);
routes.use("/update", updateRouter);



module.exports = routes;