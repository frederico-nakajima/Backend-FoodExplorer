
exports.up = knex => knex.schema.createTable("dish",table =>{
    table.increments("id");
    table.text("foto_prato");  // Adicione essa linha à criação da tabela
    table.text("name");
    table.text("categoria");
    table.integer("user_id").references("id").inTable("users");
    table.integer("preco");
    table.text("description");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());

});

  



exports.down = knex => knex.schema.dropTable("dish");