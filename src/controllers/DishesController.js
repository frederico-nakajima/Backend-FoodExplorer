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
    const user_id = request.user.id;

    const dishes = await knex("dishes")
      .select("name", "price", "description") // Apenas os campos desejados
      .where({ user_id })
    
    return response.json(dishes);
  }

  async delete(request,response){
    const {id} = request.params

    await knex ("dishes").where({id}).delete()

    return response.json()

  }
 
}

module.exports = DishesController;