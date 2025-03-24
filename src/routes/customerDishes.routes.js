const { Router } = require("express");
const CustomerDishesController = require("../controllers/CustomerDishesController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const customerDishesController = new  CustomerDishesController();

const dishesCustomerRoutes = Router();
dishesCustomerRoutes.use(ensureAuthenticated);

dishesCustomerRoutes.get("/:id",verifyUserAuthorization("customer"),  customerDishesController.show);
dishesCustomerRoutes.get("/",verifyUserAuthorization("customer"),  customerDishesController.index);

module.exports = dishesCustomerRoutes;