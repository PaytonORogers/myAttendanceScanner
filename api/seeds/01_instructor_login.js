/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('instructor_login').del()
  await knex('instructor_login').insert([
    {edipi: '12345', username: '1', hashed_password: 'password1', email: '1@mail.com', first_name: 'john', middle_initial: 'f', last_name: 'doe', date_of_birth: '19940216', branch: 'space force', rank: 'e7', card_expiration: '20260101'},
    {edipi: '22345', username: '2', hashed_password: 'password2', email: '2@mail.com', first_name: 'johnny', middle_initial: 'f', last_name: 'pockets', date_of_birth: '19670807', branch: 'space force', rank: 'e7', card_expiration: '20260101'},
    {edipi: '32345', username: '3', hashed_password: 'password3', email: '3@mail.com', first_name: 'josh', middle_initial: 'f', last_name: 'noll', date_of_birth: '19910908', branch: 'space force', rank: 'e7', card_expiration: '20260101'}
  ]);
};
