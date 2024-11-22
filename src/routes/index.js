const { Router } = require("express");
const customerRouter = require("./customer.routes");
const adminRouter = require("./admin.routes");
const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");



const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);



module.exports = routes;