const { Router } = require("express");
const CustomersMenuController = require("../controllers/CustomersMenuController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const customersMenuRoutes = Router();

const  customersMenuController = new  CustomersMenuController();

customersMenuRoutes.use(ensureAuthenticated);

customersMenuRoutes.get("/",  customersMenuController.index);
customersMenuRoutes.post("/", verifyUserAuthorization("customer"),  customersMenuController.create);

module.exports = customersMenuRoutes;