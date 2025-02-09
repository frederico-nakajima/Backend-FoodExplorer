const knex = require("../database/knex")


class AddController{
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

 
}


module.exports = AddController;