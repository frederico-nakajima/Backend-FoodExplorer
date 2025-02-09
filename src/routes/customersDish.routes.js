const { Router } = require("express");
const CustomersDishController = require("../controllers/CustomersDishController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const customersDishRoutes = Router();

const  customersDishController = new  CustomersDishController();

customersDishRoutes.use(ensureAuthenticated);

customersDishRoutes.get("/",  customersDishController.index);
customersDishRoutes.post("/", verifyUserAuthorization("admin"),  customersDishController.create);

module.exports = customersDishRoutes;