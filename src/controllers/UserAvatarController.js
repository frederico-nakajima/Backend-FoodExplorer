
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
    async update(request,response){
        const user_id = request.user.id;
        const dishFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("users")
        .where({id:user_id}).first();

        if (!user) {
            throw new AppError("Somente usuários autorizados podem mudar o avatar",401);
        }

        if (user.dish_photo) {
            await diskStorage.deleteFile(user.dish_photo)
        }

        const filename = await diskStorage.saveFile(dishFilename);
        user.dish_photo = filename;

        await knex("users").update(user).where({ id:user_id});

        return response.json(user);
    }
}



module.exports = UserAvatarController;