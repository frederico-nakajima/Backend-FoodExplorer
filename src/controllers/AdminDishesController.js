const knex = require("../database/knex");

class AdminDishesController{
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
        dish_id,          
        name,
        user_id
      }
    });
    await knex("tags").insert(tagsInsert)    
    return response.status(201).json({ id: dish_id });
  }
  
  async update(request, response) {
    const { id } = request.params; 
    const { name, category, tags, price, description } = request.body;
    const user_id = request.user.id;  
    await knex("dishes")
      .where({ id })
      .update({
        name,
        category,
        price,
        description,
        user_id,
    });    
    await knex("tags").where({ dish_id: id }).delete();    
    const tagsInsert = tags.map((name) => {

      return {
        name,
        dish_id: id,
        user_id,
      };
    });    
    await knex("tags").insert(tagsInsert); 

    return response.json({ message: "Prato atualizado com sucesso!" });    
  }

  async show (request,response){
    const{ id } = request.params;    
    const dish = await knex("dishes").where({id}).first()
    const tags = await knex ("tags")
    .where({dish_id:id})
    .orderBy("name")
    .pluck("name");

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

module.exports = AdminDishesController;