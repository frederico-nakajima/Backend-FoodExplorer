const { Router } = require("express");
const AdminDishController = require("../controllers/AdminDishController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const adminDishRoutes = Router();

const adminDishController = new  AdminDishController();

adminDishRoutes.use(ensureAuthenticated);

adminDishRoutes.get("/",  adminDishController.index);
adminDishRoutes.post("/", verifyUserAuthorization("admin"), adminDishController.create);

module.exports = adminDishRoutes;