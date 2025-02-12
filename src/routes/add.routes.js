const { Router } = require("express");
const AddController = require("../controllers/AddController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const addRoutes = Router();

const addController = new  AddController();

addRoutes.use(ensureAuthenticated);


addRoutes.post("/", verifyUserAuthorization("admin"),  addController.create);

module.exports = addRoutes;