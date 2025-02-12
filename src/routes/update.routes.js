const { Router } = require("express");
const UpdateController = require("../controllers/UpdateController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const updateRoutes = Router();

const updateController = new UpdateController();

updateRoutes.use(ensureAuthenticated);

updateRoutes.put("/:id", verifyUserAuthorization("admin"), updateController.update);

module.exports = updateRoutes;
