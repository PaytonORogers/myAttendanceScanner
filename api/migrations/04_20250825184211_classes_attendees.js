/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('classes_attendees', table => {
        table.string('attendees_edipi').references('attendees.attendees_edipi').notNullable();
        table.integer('class_id').references('classes.class_id').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('classes_attendees');
};
