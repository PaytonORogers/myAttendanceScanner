/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('instructor_login', table => {
        // table.integer('edipi').primary().notNullable();
        table.string('username').primary().notNullable();
        table.string('hashed_password').notNullable();
    //     table.string('email').notNullable();
    //     table.string('first_name').notNullable();
    //     table.string('middle_initial').notNullable();
    //     table.string('last_name').notNullable();
    //     table.string('date_of_birth').notNullable();
    //     table.string('branch').notNullable();
    //     table.string('rank').notNullable();
    //     table.string('card_expiration').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('instructor_login');
};