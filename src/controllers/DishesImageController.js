
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesImageController {
    async update(request,response){
        const { dish_id }  = request.params;
        const dishFilename = request.file.filename;
        const diskStorage = new DiskStorage();
        
        const dish = await knex("dishes")
        .where({id:dish_id })
        .first();

        if (!dish) {
            throw new AppError("Prato não encontrado.", 404);
        }

        if (dish.image) {
            await diskStorage.deleteFile(dish.image)
        }

        const filename = await diskStorage.saveFile(dishFilename);
        dish.image = filename;

        await knex("dishes").update({ image: filename }).where({ id:dish_id});

        return response.json(dish);
    }
}

module.exports = DishesImageController;