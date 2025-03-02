const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const CustomerDishesController = require("../controllers/CustomerDishesController");
const DishesImageController = require("../controllers/DishesImageController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishesCustomerRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const customerDishesController = new  CustomerDishesController();
const dishesImageController = new  DishesImageController();

dishesCustomerRoutes.use(ensureAuthenticated);

dishesCustomerRoutes.get("/:id",verifyUserAuthorization("customer"),  customerDishesController.show);
dishesCustomerRoutes.get("/",verifyUserAuthorization("customer"),  customerDishesController.index);

module.exports = dishesCustomerRoutes;