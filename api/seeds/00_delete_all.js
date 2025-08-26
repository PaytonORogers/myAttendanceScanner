/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('classes_attendees').del()
  await knex('attendees').del()
  await knex('classes').del()
  await knex('instructor_login').del()
};
