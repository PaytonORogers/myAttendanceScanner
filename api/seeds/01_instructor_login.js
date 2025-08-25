/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('instructor_login').del()
  await knex('instructor_login').insert([
    {edipi: '12345', username: '1', hashed_password: 'password1', email: '1@mail.com', first_name: 'john', middle_initial: 'f', last_name: 'doe', date_of_birth: '1994-02-16', branch: 'space force', rank: 'e7', card_expiration: '20260101'},
  ]);
};
