const { Router } = require("express");
const AdminMenuController = require("../controllers/AdminMenuController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const adminMenuRoutes = Router();

const  adminMenuController = new  AdminMenuController();

adminMenuRoutes.use(ensureAuthenticated);

adminMenuRoutes.get("/",  adminMenuController.index);
adminMenuRoutes.post("/", verifyUserAuthorization("admin"),  adminMenuController.create);

module.exports = adminMenuRoutes;