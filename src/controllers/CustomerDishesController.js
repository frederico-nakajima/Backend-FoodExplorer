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
    const { name, category, price, description } = request.query;

    let query = knex("dishes").select("*"); 

    // 🔍 Aplica filtros dinamicamente apenas se o usuário os enviar
    if (name) {
        query.where("name", "LIKE", `%${name}%`); // 🔹 Busca parcial (case insensitive)
    }
    if (category) {
        query.where("category", category); // 🔹 Filtra pela categoria exata
    }
    if (price) {
        query.where("price", "<=", parseFloat(price)); // 🔹 Busca pratos com preço menor ou igual
    }
    if (description) {
        query.where("description", "LIKE", `%${description}%`); // 🔹 Busca parcial na descrição
    }

    try {
        const dishes = await query; // 🔹 Executa a consulta
        return response.json(dishes);
    } catch (error) {
        console.error("Erro ao buscar pratos:", error);
        return response.status(500).json({ error: "Erro ao buscar pratos" });
    }
}


} 


module.exports = CustomerDishesController;