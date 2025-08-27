/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('instructor_login').del()
  await knex('instructor_login').insert([
    {hashed_password: 'password1', email: '1@mail.com'},
  ]);
};
