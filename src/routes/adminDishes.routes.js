const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const AdminDishesController = require("../controllers/AdminDishesController");
const DishesImageController = require("../controllers/DishesImageController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const adminDishesController = new  AdminDishesController();
const dishesImageController = new  DishesImageController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", verifyUserAuthorization("admin"), adminDishesController.create);
dishesRoutes.get("/:id",verifyUserAuthorization("admin"),  adminDishesController.show);
dishesRoutes.delete("/:id", verifyUserAuthorization("admin"), adminDishesController.delete);
dishesRoutes.put("/:id", verifyUserAuthorization("admin"), adminDishesController.update);
dishesRoutes.get("/",verifyUserAuthorization("admin"),  adminDishesController.index);
dishesRoutes.patch("/image", ensureAuthenticated, upload.single("image"), dishesImageController.update);


module.exports = dishesRoutes;