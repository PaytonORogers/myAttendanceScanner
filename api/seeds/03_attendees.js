/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('attendees').del()
  await knex('attendees').insert([
    {email: '1@gmail.com', phone_number: '91855555555', first_name: 'john', last_name: 'doe', middle_initial: 'f', date: '2000-01-01', branch: 'space force', rank: 'e1', card_expiration: '2026-01-01'}
  ]);
};
