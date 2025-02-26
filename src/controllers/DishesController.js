const knex = require("../database/knex")


class DishesController{
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
    console.log("✅ Prato salvo com ID:", dish_id);
    
    const tagsInsert = tags.map(name => {
      return {
        dish_id,          
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsInsert)
    console.log("✅ Tags salvas:", tagsInsert);

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
  
  
  async update(request, response) {
    const { id } = request.params; // Obtém o ID do prato a ser atualizado
    const { name, category, tags, price, description } = request.body;
    const user_id = request.user.id;
    
    // Atualiza o prato na tabela "dishes"
    await knex("dishes")
    .where({ id })
    .update({
      name,
      category,
      price,
      description,
      user_id,
      updated_at: knex.fn.now(), // Se houver um campo de atualização de data
    });
    
    // Remove as tags antigas relacionadas a esse prato
    await knex("tags").where({ dish_id: id }).delete();
    
    // Insere as novas tags
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


module.exports = DishesController;