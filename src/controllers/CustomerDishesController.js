const knex = require("../database/knex")


class CustomerDishesController{
  async show (request,response){
    const{ id } = request.params

    const dish = await knex("dishes").where({id}).first()
    const tags = await knex ("tags").where({dish_id:id}).orderBy("name")
    
    return response.json({
      ...dish,
      tags
    })
  } 
  
  async index(request, response) {
    const { name } = request.query;
  
    try {
      let dishes;
  
      if (name) {
        // Se houver um filtro por nome, busca nos dois: pratos e tags
        dishes = await knex("dishes")
          .leftJoin("tags", "dishes.id", "tags.dish_id")
          .select(
            "dishes.id",
            "dishes.name",
            "dishes.category",
            "dishes.price",
            "dishes.description",
            "dishes.user_id",
            "dishes.image" 
          )
          
          .where(function () {
            this.where("dishes.name", "like", `%${name}%`)
              .orWhere("tags.name", "like", `%${name}%`);
          })
          .groupBy("dishes.id") 
          .orderBy("dishes.name");
      } else {
        // Se não houver filtro, retorna todos os pratos
        dishes = await knex("dishes")
          .select(
            "dishes.id",
            "dishes.name",
            "dishes.category",
            "dishes.price",
            "dishes.description",
            "dishes.user_id",
            "dishes.image" 
          )
        
          .orderBy("dishes.name");
        }
  
      return response.json(dishes);
    } catch (error) {
      console.error("Erro ao buscar pratos:", error);
      return response.status(500).json({ error: "Erro ao buscar pratos" });
    }
  }
  

} 


module.exports = CustomerDishesController;