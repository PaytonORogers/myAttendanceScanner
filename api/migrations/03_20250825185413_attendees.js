const { table } = require("../db");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('attendees', table => {
        table.increments('attendees_edipi').primary();
        table.string('email').notNullable();
        table.string('phone_number').nullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('middle_initial').notNullable();
        table.date('date').notNullable();
        table.string('branch').notNullable();
        table.string('rank').notNullable();
        table.string('card_expiration').notNullable();
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('attendees');
};
