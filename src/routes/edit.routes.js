const { Router } = require("express");
const EditController = require("../controllers/EditController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const editRoutes = Router();

const editController = new  EditController();

editRoutes.use(ensureAuthenticated);

editRoutes.get("/", editController.index);
editRoutes.post("/", verifyUserAuthorization("admin"), editController.create);

module.exports = editRoutes;