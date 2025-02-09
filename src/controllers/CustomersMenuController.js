const knex = require("../database/knex")


class CustomersMenuController{

  async index(request, response) {
    const user_id = request.user.id;

    const dishes = await knex("dishes")
      .select("name", "price", "description") // Apenas os campos desejados
      .where({ user_id })
    
    return response.json(dishes);
  }
  
}


module.exports = CustomersMenuController;