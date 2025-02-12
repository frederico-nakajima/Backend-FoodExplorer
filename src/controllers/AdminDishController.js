const knex = require("../database/knex")


class AdminDishController{

  async show (request,response){
    const{ id } = request.params
    const dish = await knex("dishes").where({id}).first()
    const tags = await knex ("tags").where({dish_id:id}).orderBy("name")
    
    return response.json({
      ...dish,
      tags
    })
  }
 
}
  



module.exports = AdminDishController;