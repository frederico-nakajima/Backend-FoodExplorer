
exports.up = knex => knex.schema.createTable("tags",table =>{
    table.increments("id");
    table.text("name").notNullable();
    
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");

});


exports.down = knex => knex.schema.dropTable("tags")
  


