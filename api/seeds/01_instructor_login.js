/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('instructor_login').del()
  await knex('instructor_login').insert([
    {username: '1', hashed_password: '$2b$12$TXzoTdUQv4NZYp9hzPwJCuVc3a4wmaD3t2Nr15VNPFMS8unug7wse'},
  ]);
};
