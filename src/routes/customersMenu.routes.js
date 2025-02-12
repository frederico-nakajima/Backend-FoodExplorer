const { Router } = require("express");
const CustomersMenuController = require("../controllers/CustomersMenuController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const customersMenuRoutes = Router();

const  customersMenuController = new  CustomersMenuController();

customersMenuRoutes.use(ensureAuthenticated);

customersMenuRoutes.get("/",verifyUserAuthorization("customer"),  customersMenuController.index);


module.exports = customersMenuRoutes;