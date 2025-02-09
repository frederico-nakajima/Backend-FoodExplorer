const knex = require("../database/knex")


class EditController{
  async create(request,response){ 
    const{name,category,tags,price,description}= request.body;
    const user_id = request.user.id;

    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      user_id
    })
    
    const tagsInsert = tags.map(name => {
      return {
        name,
        dish_id,          
        user_id
      }
    });

    await knex("tags").insert(tagsInsert)

    return response.json()
  }


  async show (request,response){
    const{ id } = request.params
    const dish = await knex("dishes").where({id}).first()
    const tags = await knex ("tags").where({dish_id:id}).orderBy("name")
    
    return response.json({
      ...dish,
      tags
    })
  }


  async delete(request,response){
    const {id} = request.params

    await knex ("dishes").where({id}).delete()

    return response.json()

  }

  async index(request, response) {
    const user_id = request.user.id;

    const dishes = await knex("dishes")
      .select("name", "price", "description") // Apenas os campos desejados
      .where({ user_id })
    
    return response.json(dishes);
  }
  
}


module.exports = EditController;