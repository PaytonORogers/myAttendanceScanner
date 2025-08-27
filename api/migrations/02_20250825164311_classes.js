/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('class_id').primary().notNullable();
        table.string('class_title').notNullable();
        table.string('instructor_username').references('instructor_login.username').notNullable();
        table.date('date').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // await knex.schema.alterTable('classes', table => {
    //     table.dropForeign('instructor_edipi')
    // })
    await knex.schema.dropTableIfExists('classes');
};
