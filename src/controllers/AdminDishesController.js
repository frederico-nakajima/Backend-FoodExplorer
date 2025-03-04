const knex = require("../database/knex")


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
    const { name, category, price, description } = request.query;

    let query = knex("dishes").select("*"); // 🔹 Busca todos os pratos por padrão

    // 🔍 Aplica filtros dinamicamente apenas se o usuário os enviar
    if (name) {
        query.where("name", "ILIKE", `%${name}%`); // 🔹 Busca parcial (case insensitive)
    }
    if (category) {
        query.where("category", category); // 🔹 Filtra pela categoria exata
    }
    if (price) {
        query.where("price", "<=", parseFloat(price)); // 🔹 Busca pratos com preço menor ou igual
    }
    if (description) {
        query.where("description", "ILIKE", `%${description}%`); // 🔹 Busca parcial na descrição
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


module.exports = AdminDishesController;