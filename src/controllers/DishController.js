const knex = require("../database/knex")


class DishController{

    async show (request,response){
        const{ id } = request.params

        const note = await knex("notes").where({id}).first()
        const tags = await knex ("tags").where({note_id:id}).orderBy("name")
        const links = await knex ("links").where({note_id:id}).orderBy("created_at")

        return response.json({
            ...note,
            tags,
            links
        })
    }
}




module.exports = NotesController;