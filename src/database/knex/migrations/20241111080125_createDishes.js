
exports.up = knex => knex.schema.createTable("dishes",table =>{
    table.increments("id");
    table.text("image");  
    table.text("name");
    table.text("category");
    table.integer("user_id").references("id").inTable("users");
    table.integer("price");
    table.text("description");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());

});

  



exports.down = knex => knex.schema.dropTable("dish");