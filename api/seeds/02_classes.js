/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('classes').del()
  await knex('classes').insert([
    {class_title: 'SAPR', date: '2000-08-09'}
  ]);
};
