const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");


const DishesController = require("../controllers/DishesController");
const DishesImageController = require("../controllers/DishesImageController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const dishesController = new  DishesController();
const dishesImageController = new  DishesImageController();

dishesRoutes.use(ensureAuthenticated);


dishesRoutes.post("/", verifyUserAuthorization("admin"), dishesController.create);
dishesRoutes.get("/:id",verifyUserAuthorization("admin"),  dishesController.show);
dishesRoutes.delete("/:id", verifyUserAuthorization("admin"), dishesController.delete);
dishesRoutes.put("/:id", verifyUserAuthorization("admin"), dishesController.update);
dishesRoutes.get("/",verifyUserAuthorization("admin"),  dishesController.index);
dishesRoutes.patch("/image", ensureAuthenticated, upload.single("image"), dishesImageController.update);


module.exports = dishesRoutes;