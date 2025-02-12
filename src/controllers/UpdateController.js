const knex = require("../database/knex");

class UpdateController {
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
}

module.exports = UpdateController;
