/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('classes_attendees').del()
  await knex('classes_attendees').insert([
    {attendees_edipi: '12345', class_id: '1'}
  ]);
};
